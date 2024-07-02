import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db'; // Adjust the import path if needed

interface SignInRequestBody {
  username: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password }: SignInRequestBody = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Query the database to find the user
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = (rows as any)[0]; // Casting to any here to handle typing

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return res.status(200).json({ message: 'Sign-in successful' });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
