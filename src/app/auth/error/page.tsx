// app/auth/error/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ErrorPage = () => {
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const error = queryParams.get('error');

  useEffect(() => {
    if (!error) {
      // Redirect to home page or some other page if error is not present
      router.push('/');
    }
  }, [error, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Something went wrong</h2>
        <p className="text-center text-red-500">
          {error ? `Error: ${error}` : 'An unknown error occurred'}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
