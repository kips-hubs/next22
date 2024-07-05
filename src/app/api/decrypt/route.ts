import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Readable } from 'stream';

const ENCRYPTED_DIR = path.join(process.cwd(), 'encrypted');
const DECRYPTED_DIR = path.join(process.cwd(), 'decrypted');
const METADATA_FILE = path.join(process.cwd(), 'metadata.json');

// Ensure the directories exist
if (!fs.existsSync(ENCRYPTED_DIR)) fs.mkdirSync(ENCRYPTED_DIR);
if (!fs.existsSync(DECRYPTED_DIR)) fs.mkdirSync(DECRYPTED_DIR);

// Function to convert Web Stream to Node.js Readable Stream
function webStreamToNodeStream(webStream: ReadableStream<Uint8Array>): Readable {
  const nodeStream = new Readable({ read() {} });
  const reader = webStream.getReader();

  function push() {
    reader.read().then(({ done, value }) => {
      if (done) nodeStream.push(null);
      else {
        nodeStream.push(Buffer.from(value));
        push();
      }
    }).catch(err => nodeStream.destroy(err));
  }

  push();
  return nodeStream;
}

// Function to retrieve metadata for a given file path
function getMetadata(filePath: string) {
  if (!fs.existsSync(METADATA_FILE)) return null;
  const data = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  return data.find((file: any) => file.filePath === filePath);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const password = formData.get('password') as string;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const filePath = path.join(ENCRYPTED_DIR, file.name);
    const metadata = getMetadata(filePath);

    if (!metadata || metadata.password !== password) {
      return NextResponse.json({ error: 'Invalid password or metadata not found' }, { status: 400 });
    }

    const decryptedFilePath = path.join(DECRYPTED_DIR, file.name);

    // Convert the Blob to a Node.js readable stream
    const readableStream = webStreamToNodeStream(file.stream());

    // Save the uploaded file
    const fileStream = fs.createWriteStream(filePath);
    await new Promise<void>((resolve, reject) => {
      readableStream.pipe(fileStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Decrypt the file
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const iv = fs.readFileSync(filePath).slice(0, 16); // Read IV from the beginning of the file
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    const input = fs.createReadStream(filePath, { start: 16 }); // Skip the IV
    const output = fs.createWriteStream(decryptedFilePath);

    await new Promise<void>((resolve, reject) => {
      input.pipe(decipher).pipe(output)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Delay file deletion to avoid EBUSY error
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }, 1000); // 1 second delay

    return NextResponse.json({ message: 'File decrypted and saved', path: decryptedFilePath }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: `Error processing file: ${error.message}` }, { status: 500 });
  }
}
