import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2/promise';

// Define the user type for the application
interface User {
    id: string;
    username: string;
    password: string;
    email?: string; // Adjust based on your schema
}

// Define the user type returned from the `authorize` function
interface CustomUser extends NextAuthUser {
    id: string;
    name: string;
}

const authOptions: NextAuthOptions = {
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
                    // Execute the query
                    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);

                    // Assert that rows are of type User[]
                    const users = rows as User[];

                    const user = users[0];

                    if (!user) {
                        throw new Error('No user found');
                    }

                    // Compare password
                    const isMatch = await bcrypt.compare(password, user.password);

                    if (isMatch) {
                        return { id: user.id, name: user.username } as CustomUser;
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
                token.id = (user as CustomUser).id;
                token.name = (user as CustomUser).name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name as string,
                };
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
