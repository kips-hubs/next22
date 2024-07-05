// /api/encrypt.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const ENCRYPTED_DIR = path.join(process.cwd(), 'encrypted');
const METADATA_FILE = path.join(process.cwd(), 'metadata.json');

// Ensure the directories and metadata file exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(ENCRYPTED_DIR)) fs.mkdirSync(ENCRYPTED_DIR);
if (!fs.existsSync(METADATA_FILE)) fs.writeFileSync(METADATA_FILE, JSON.stringify([]));

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

async function saveMetadata(metadata: any) {
  let data = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  data.push(metadata);
  fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const password = formData.get('password') as string;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const filePath = path.join(UPLOAD_DIR, file.name);
    const encryptedFilePath = path.join(ENCRYPTED_DIR, file.name);

    const readableStream = webStreamToNodeStream(file.stream());
    const fileStream = fs.createWriteStream(filePath);
    await new Promise<void>((resolve, reject) => {
      readableStream.pipe(fileStream).on('finish', resolve).on('error', reject);
    });

    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(encryptedFilePath);
    output.write(iv);

    input.pipe(cipher).pipe(output);

    await new Promise<void>((resolve, reject) => {
      output.on('finish', resolve);
      output.on('error', reject);
    });

    fs.unlinkSync(filePath);

    const metadata = {
      filePath: encryptedFilePath,
      originalName: file.name,
      password,
      lastEncrypted: new Date().toISOString()
    };
    await saveMetadata(metadata);

    return NextResponse.json({ message: 'File encrypted and saved', path: encryptedFilePath }, { status: 200 });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: `Error processing file: ${error.message}` }, { status: 500 });
  }
}
