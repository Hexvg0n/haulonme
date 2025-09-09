import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const sessionToken = cookies().get('session_token')?.value
  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const client = await clientPromise
    const db = client.db(process.env.DB_NAME)
    const productData = await request.json()

    delete productData._id;

    await db.collection('products').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: productData }
    )
    return NextResponse.json({ message: "Product updated successfully" })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Error updating product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const sessionToken = cookies().get('session_token')?.value
    if (!sessionToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        await db.collection('products').deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json({ message: "Product deleted successfully" })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Error deleting product" }, { status: 500 })
    }
}