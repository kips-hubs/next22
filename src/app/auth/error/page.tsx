'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const router = useRouter();

  useEffect(() => {
    if (!error) {
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
