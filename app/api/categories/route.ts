import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await clientPromise
  const db = client.db("haulonme_db")
  const categories = await db.collection('categories').find({}).toArray()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
    const client = await clientPromise
    const db = client.db("haulonme_db")
    const category = await request.json()
    await db.collection('categories').insertOne(category)
    return NextResponse.json(category)
}