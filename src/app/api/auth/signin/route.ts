import { NextResponse } from 'next/server';
import argon2 from 'argon2';
import pool from '@/lib/db'; // Adjust the import path as needed

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        // Query the database to find the user
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = (rows as any)[0]; // Casting to any here to handle typing
        console.log('User Found:', user); // Log user details

        if (!user) {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }

        // Log the provided password and the stored hash
        console.log('Provided Password:', password);
        console.log('Stored Hashed Password:', user.password);

        // Compare passwords
        const isMatch = await argon2.verify(user.password, password);
        console.log('Password Match:', isMatch); // Log password match status

        if (isMatch) {
            return NextResponse.json({ message: 'Sign-in successful' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
