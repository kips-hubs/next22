// src/app/api/files/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export async function GET() {
  try {
    const files = fs.readdirSync(UPLOAD_DIR);
    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Error listing files' }, { status: 500 });
  }
}
