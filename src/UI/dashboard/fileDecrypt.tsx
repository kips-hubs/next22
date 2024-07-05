'use client';
import React, { useState } from 'react';

const FileDecrypt: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('password', password);

      try {
        const response = await fetch('/api/decrypt', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setMessage(`File decrypted and saved at: ${result.path}`);
        } else {
          setMessage(`Error: ${result.error}`);
        }
      } catch (error) {
        setMessage('An unexpected error occurred.');
      }
    } else {
      alert('Please select a file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Decrypt Your File</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Select Encrypted File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Decrypt File
          </button>
        </form>
        {message && (
          <div className="mt-4">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDecrypt;
