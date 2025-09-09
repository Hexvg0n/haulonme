import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const client = await clientPromise
        const db = client.db("haulonme_db")
        const categoryData = await request.json()
        
        // Remove the immutable _id field before updating
        delete categoryData._id

        await db.collection('categories').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: categoryData }
        )
        return NextResponse.json({ message: "Category updated successfully" })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Error updating category" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const client = await clientPromise
        const db = client.db("haulonme_db")
        await db.collection('categories').deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json({ message: "Category deleted successfully" })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: "Error deleting category" }, { status: 500 })
    }
}