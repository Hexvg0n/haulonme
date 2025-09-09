import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("haulonme_db")
    const requests = await db.collection('photo_requests').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(requests)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error fetching requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("haulonme_db")
    const requestData = await request.json()
    const newRequest = {
        ...requestData,
        createdAt: new Date(),
    }
    await db.collection('photo_requests').insertOne(newRequest)
    return NextResponse.json(newRequest, { status: 201 })
  } catch(e) {
    console.error(e)
    return NextResponse.json({ error: "Error creating request" }, { status: 500 })
  }
}