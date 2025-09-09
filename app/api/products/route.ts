import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await clientPromise
  const db = client.db("haulonme_db")
  const products = await db.collection('products').find({}).toArray()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
    const client = await clientPromise
    const db = client.db("haulonme_db")
    const product = await request.json()
    await db.collection('products').insertOne(product)
    return NextResponse.json(product)
}