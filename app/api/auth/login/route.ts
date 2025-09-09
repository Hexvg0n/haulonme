import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Ensure JWT_SECRET is set
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set.');
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create a JWT with the user's ID. You can add more data like roles if needed.
    const token = jwt.sign(
      { userId: user._id },
      jwtSecret,
      { expiresIn: '1d' } // Token will expire in 1 day
    );
    
    // Set the token in a secure, httpOnly cookie
    cookies().set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day in seconds
        path: '/',
    });

    return NextResponse.json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}