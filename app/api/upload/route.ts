import { type NextRequest, NextResponse } from "next/server"
import { getStorage } from "firebase-admin/storage"
import { initializeApp, getApps, cert } from "firebase-admin/app"

// Initialize Firebase Admin (server-side)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    // Upload to Firebase Storage
    const bucket = getStorage().bucket()
    const fileName = `projects/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const fileUpload = bucket.file(fileName)
    await fileUpload.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    })

    // Make file publicly accessible
    await fileUpload.makePublic()

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
