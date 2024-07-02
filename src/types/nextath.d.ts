// types/next-auth.d.ts

import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

// Extending NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string; 
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email?: string; 
  }
}
