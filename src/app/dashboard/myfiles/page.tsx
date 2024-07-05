'use client';

import { useState } from 'react';
import axios from 'axios';

interface File {
  id: number;
  name: string;
}

interface FilesPageProps {
  files: File[];
}

const FilesPage = ({ files }: FilesPageProps) => {
  const [fileList, setFileList] = useState(files);

  const handleAction = async (id: number, action: string) => {
    try {
      if (action === 'encrypt') {
        await axios.post(`/api/files/${id}/encrypt`);
      } else if (action === 'decrypt') {
        await axios.post(`/api/files/${id}/decrypt`);
      } else if (action === 'download') {
        window.location.href = `/api/files/${id}/download`;
      } else if (action === 'delete') {
        await axios.delete(`/api/files/${id}`);
        setFileList(fileList.filter(file => file.id !== id));
      }
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Files</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {fileList.map((file) => ( */}
            <tr key={'file.id'}>
              <td className="py-2 px-4 border-b">{'file.id'}</td>
              <td className="py-2 px-4 border-b">{'file.name'}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" >Encrypt</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2" >Decrypt</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2" >Download</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default FilesPage;
