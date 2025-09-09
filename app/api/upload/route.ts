import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const files: File[] = data.getAll('files') as unknown as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: 'No files uploaded' }, { status: 400 })
    }

    const uploadedFilePaths = []
    const uploadDir = path.join(process.cwd(), 'public/uploads')

    // Ensure the upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error: any) {
      if (error.code !== 'EEXIST') {
        console.error('Error creating upload directory:', error)
        return NextResponse.json({ success: false, message: 'Could not create upload directory' }, { status: 500 })
      }
    }

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      // Create a Uint8Array directly from the ArrayBuffer
      const buffer = new Uint8Array(bytes)

      const filename = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, filename)

      // Write the file to the filesystem
      await writeFile(filePath, buffer)

      uploadedFilePaths.push(`/uploads/${filename}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      paths: uploadedFilePaths,
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json({ success: false, message: `File upload failed: ${error}` }, { status: 500 })
  }
}