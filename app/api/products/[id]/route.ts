import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("haulonme_db")
    const productData = await request.json()
    
    // Remove the immutable _id field before updating
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
    try {
        const client = await clientPromise
        const db = client.db("haulonme_db")
        await db.collection('products').deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json({ message: "Product deleted successfully" })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Error deleting product" }, { status: 500 })
    }
}