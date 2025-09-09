import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// Handles GET requests to fetch all photo requests
export async function GET(request: Request) {
  const sessionToken = cookies().get('session_token')?.value
  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET is not set.')
    return new NextResponse('Internal Server Error', { status: 500 })
  }

  try {
    // Verify the admin's token
    await jwtVerify(sessionToken, new TextEncoder().encode(secret))

    // If token is valid, fetch the data
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const requests = await db.collection('photo_requests').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(requests)

  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}

// Handles POST requests to submit a new photo request from the public form
export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const requestData = await request.json()

    // Add a server-side timestamp for the new request
    const newRequest = {
      ...requestData,
      createdAt: new Date(),
    }

    await db.collection('photo_requests').insertOne(newRequest)
    return NextResponse.json({ message: 'Request submitted successfully' }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error submitting request' }, { status: 500 })
  }
}