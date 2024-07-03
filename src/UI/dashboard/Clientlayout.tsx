// src/components/ClientLayout.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
      {session && (
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 text-white bg-red-600 rounded"
        >
          Logout
        </button>
      )}
    </>
  );
}
