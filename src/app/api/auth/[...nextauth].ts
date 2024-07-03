import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/db'; // Adjust the import path if needed
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
          console.error('No credentials provided');
          throw new Error('No credentials provided');
        }

        const { username, password } = credentials;

        try {
          const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
          const user = (rows as any)[0]; // Casting to any here to handle typing

          if (!user) {
            console.error('No user found');
            throw new Error('No user found');
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return { id: user.id, name: user.username, email: user.email } as { id: string; name: string; email?: string };
          } else {
            console.error('Invalid password');
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
    error: '/auth/error', // Custom error page
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email; // Add email if necessary
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string, // Add email if necessary
        };
      }
      return session;
    },
  },
});
