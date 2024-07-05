'use client'
import React, { useEffect, useState } from 'react';

interface FileEntry {
  name: string;
  path: string;
}

interface FilesData {
  uploads: FileEntry[];
  encrypted: FileEntry[];
  decrypted: FileEntry[];
}

const FileTable: React.FC = () => {
  const [files, setFiles] = useState<FilesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        const data: FilesData = await response.json();
        setFiles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Files Overview</h1>
      <div className="flex flex-col w-full gap-2 mt-3">
        <FileCategory title="Uploads" files={files?.uploads} />
        <FileCategory title="Encrypted" files={files?.encrypted} />
        <FileCategory title="Decrypted" files={files?.decrypted} />
      </div>
    </div>
  );
};

const FileCategory: React.FC<{ title: string; files?: FileEntry[] }> = ({ title, files }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">File Name</th>
            <th className="border px-4 py-2">File Path</th>
          </tr>
        </thead>
        <tbody>
          {files?.map(file => (
            <tr key={file.path}>
              <td className="border px-4 py-2">{file.name}</td>
              <td className="border px-4 py-2">{file.path}</td>
            </tr>
          ))}
          {!files?.length && (
            <tr>
              <td colSpan={2} className="border px-4 py-2 text-center">No files found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
