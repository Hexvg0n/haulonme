import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const sessionToken = cookies().get('session_token')?.value
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        await db.collection('photo_requests').deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json({ message: "Request deleted successfully" })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Error deleting request" }, { status: 500 })
    }
}