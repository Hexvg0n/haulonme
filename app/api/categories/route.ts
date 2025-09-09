import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const client = await clientPromise
  const db = client.db(process.env.DB_NAME)
  const categories = await db.collection('categories').find({}).toArray()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
    const sessionToken = cookies().get('session_token')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const category = await request.json()
    await db.collection('categories').insertOne(category)
    return NextResponse.json(category)
}