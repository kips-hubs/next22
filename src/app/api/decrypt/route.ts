import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Readable } from 'stream';

const ENCRYPTED_DIR = path.join(process.cwd(), 'encrypted');
const DECRYPTED_DIR = path.join(process.cwd(), 'decrypted');

// Ensure the directories exist
if (!fs.existsSync(ENCRYPTED_DIR)) {
  fs.mkdirSync(ENCRYPTED_DIR);
}
if (!fs.existsSync(DECRYPTED_DIR)) {
  fs.mkdirSync(DECRYPTED_DIR);
}

// Function to convert Web Stream to Node.js Readable Stream
function webStreamToNodeStream(webStream: ReadableStream<Uint8Array>): Readable {
  const nodeStream = new Readable({
    read() {}
  });

  const reader = webStream.getReader();

  function push() {
    reader.read().then(({ done, value }) => {
      if (done) {
        nodeStream.push(null);
      } else {
        nodeStream.push(Buffer.from(value));
        push();
      }
    }).catch(err => {
      nodeStream.destroy(err);
    });
  }

  push();
  return nodeStream;
}

export async function POST(request: NextRequest) {
  try {
    // Read the incoming form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const password = formData.get('password') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const encryptedFilePath = path.join(ENCRYPTED_DIR, file.name);
    const decryptedFilePath = path.join(DECRYPTED_DIR, file.name);

    // Convert the Blob to a Node.js readable stream
    const readableStream = webStreamToNodeStream(file.stream());

    // Save the uploaded file
    const fileStream = fs.createWriteStream(encryptedFilePath);
    await new Promise<void>((resolve, reject) => {
      readableStream.pipe(fileStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Read the IV from the start of the file
    const iv = Buffer.alloc(16);
    const fd = fs.openSync(encryptedFilePath, 'r');
    fs.readSync(fd, iv, 0, 16, 0);
    fs.closeSync(fd);

    // Create decipher instance
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    // Decrypt the file
    const input = fs.createReadStream(encryptedFilePath, { start: 16 });
    const output = fs.createWriteStream(decryptedFilePath);

    await new Promise<void>((resolve, reject) => {
      input.pipe(decipher).pipe(output)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Ensure streams are properly closed
    input.close();
    output.close();

    // Clean up the original encrypted file after ensuring the streams are closed
    setTimeout(() => {
      fs.unlink(encryptedFilePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }, 1000);

    return NextResponse.json({ message: 'File decrypted and saved', path: decryptedFilePath }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: `Error processing file: ${error.message}` }, { status: 500 });
  }
}
