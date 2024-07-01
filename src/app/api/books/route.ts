// src/app/api/books/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM books';
        const [rows] = await db.execute(query);
        db.release();

        console.log('connected to db');
        
        return NextResponse.json({ works: rows });
    } catch (error) {
        console.error('Error fetching books:', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching books' },
            { status: 500 }
        );
    }
}
