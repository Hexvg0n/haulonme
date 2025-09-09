import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const client = await clientPromise
        const db = client.db("haulonme_db")
        await db.collection('photo_requests').deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json({ message: "Request deleted successfully" })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Error deleting request" }, { status: 500 })
    }
}