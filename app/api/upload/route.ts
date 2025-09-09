import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const files: File[] = data.getAll('files') as unknown as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: 'No files uploaded' }, { status: 400 })
    }

    const uploadedFilePaths = []
    const uploadDir = path.join(process.cwd(), 'public/uploads')

    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          return NextResponse.json({ success: false, message: `File type not supported: ${file.type}` }, { status: 400 });
      }
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ success: false, message: `File size exceeds the 10MB limit.` }, { status: 400 });
      }

      const bytes = await file.arrayBuffer()
      const buffer = new Uint8Array(bytes)
      const filename = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, filename)
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