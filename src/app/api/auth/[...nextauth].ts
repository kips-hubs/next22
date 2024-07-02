import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/db'; // Adjust import path if needed
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const { username, password } = credentials;

        try {
          const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
          const user = (rows as any)[0]; // Casting to any here to handle typing

          if (!user) {
            throw new Error('No user found');
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return { id: user.id, name: user.username, email: user.email } as { id: string; name: string; email?: string };
          } else {
            throw new Error('Invalid password');
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string, 
        };
      }
      return session;
    },
  },
});
