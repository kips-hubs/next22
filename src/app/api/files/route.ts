import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const ENCRYPTED_DIR = path.join(process.cwd(), 'encrypted');
const DECRYPTED_DIR = path.join(process.cwd(), 'decrypted');

// Helper function to read files from a directory
function getFilesFromDirectory(directory: string) {
  try {
    return fs.readdirSync(directory).map(file => ({
      name: file,
      path: path.join(directory, file),
    }));
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const uploadFiles = getFilesFromDirectory(UPLOAD_DIR);
    const encryptedFiles = getFilesFromDirectory(ENCRYPTED_DIR);
    const decryptedFiles = getFilesFromDirectory(DECRYPTED_DIR);

    const files = {
      uploads: uploadFiles,
      encrypted: encryptedFiles,
      decrypted: decryptedFiles,
    };

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Error listing files' }, { status: 500 });
  }
}
