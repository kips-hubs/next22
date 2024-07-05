import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Readable } from 'stream';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
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

    const filePath = path.join(UPLOAD_DIR, file.name);
    const encryptedFilePath = path.join(UPLOAD_DIR, `${path.parse(file.name).name}.enc`);

    // Convert the Blob to a Node.js readable stream
    const readableStream = webStreamToNodeStream(file.stream());

    // Save the uploaded file
    const fileStream = fs.createWriteStream(filePath);
    await new Promise<void>((resolve, reject) => {
      readableStream.pipe(fileStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Encrypt the file
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(encryptedFilePath);

    input.pipe(cipher).pipe(output);

    await new Promise<void>((resolve, reject) => {
      output.on('finish', resolve);
      output.on('error', reject);
    });

    // Clean up the original file
    fs.unlinkSync(filePath);

    return NextResponse.json({ message: 'File encrypted and saved', path: encryptedFilePath }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: `Error processing file: ${error.message}` }, { status: 500 });
  }
}
