// /jobs/reEncryptFiles.ts
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import cron from 'node-cron';

const METADATA_FILE = path.join(process.cwd(), 'metadata.json');

async function reEncryptFile(file: any) {
  try {
    const algorithm = 'aes-256-cbc';
    const oldKey = crypto.createHash('sha256').update(file.password).digest('base64').substr(0, 32);
    const iv = fs.readFileSync(file.filePath).slice(0, 16);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(oldKey), iv);

    const input = fs.createReadStream(file.filePath, { start: 16 });
    const decryptedFilePath = file.filePath + '.dec';
    const decryptedStream = fs.createWriteStream(decryptedFilePath);

    input.pipe(decipher).pipe(decryptedStream);

    await new Promise<void>((resolve, reject) => {
      decryptedStream.on('finish', resolve);
      decryptedStream.on('error', reject);
    });

    const newPassword = uuidv4();
    const newKey = crypto.createHash('sha256').update(newPassword).digest('base64').substr(0, 32);
    const newIv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(newKey), newIv);

    const newEncryptedFilePath = file.filePath;
    const input2 = fs.createReadStream(decryptedFilePath);
    const output2 = fs.createWriteStream(newEncryptedFilePath);

    output2.write(newIv);

    input2.pipe(cipher).pipe(output2);

    await new Promise<void>((resolve, reject) => {
      output2.on('finish', resolve);
      output2.on('error', reject);
    });

    fs.unlinkSync(decryptedFilePath);

    file.password = newPassword;
    file.lastEncrypted = new Date().toISOString();

    return file;
  } catch (error) {
    console.error('Error re-encrypting file:', error);
    return null;
  }
}

function reEncryptFiles() {
  if (!fs.existsSync(METADATA_FILE)) return;

  let data = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  const now = new Date();

  const updatedDataPromises = data.map(async (file: any) => {
    const lastEncrypted = new Date(file.lastEncrypted);
    const diff = (now.getTime() - lastEncrypted.getTime()) / (1000 * 60 * 60);

    if (diff >= 1) {
      const updatedFile = await reEncryptFile(file);
      return updatedFile || file;
    }
    return file;
  });

  Promise.all(updatedDataPromises).then(updatedData => {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(updatedData, null, 2));
  });
}

// Run the job every hour
cron.schedule('0 * * * *', reEncryptFiles);
