// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db'; // Adjust the import path as needed

// Handler for POST requests to register a user
export async function POST(request: Request) {
    try {
        const { email ,username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        // Check if the user already exists
        const [existingUserRows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if ((existingUserRows as any).length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await pool.query('INSERT INTO users (email ,username, password) VALUES (?, ?, ?)', [email,username, hashedPassword]);

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
