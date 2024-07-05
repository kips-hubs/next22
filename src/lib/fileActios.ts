// lib/fileActions.ts

import axios from 'axios';

export const encryptFile = async (id: number) => {
  // Implement your file encryption logic here
  await axios.post(`/api/files/${id}/encrypt`);
};

export const decryptFile = async (id: number) => {
  // Implement your file decryption logic here
  await axios.post(`/api/files/${id}/decrypt`);
};

export const downloadFile = async (id: number) => {
  // Implement your file download logic here
  window.location.href = `/api/files/${id}/download`;
};

export const deleteFile = async (id: number) => {
  // Implement your file deletion logic here
  await axios.delete(`/api/files/${id}`);
};
