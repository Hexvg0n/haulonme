import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const client = await clientPromise
  const db = client.db(process.env.DB_NAME)
  const products = await db.collection('products').find({}).toArray()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
    const sessionToken = cookies().get('session_token')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("haulonme_db")
    const product = await request.json()
    await db.collection('products').insertOne(product)
    return NextResponse.json(product)
}