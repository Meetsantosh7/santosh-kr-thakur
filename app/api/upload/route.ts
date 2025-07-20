import { type NextRequest, NextResponse } from "next/server"
import { getStorage } from "firebase-admin/storage"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import serviceAccount from "../../../serviceAccountKey.json" // adjust the path if needed

// Initialize Firebase Admin (server-side)
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert(serviceAccount as any),
      storageBucket: "contact-us-form-3e89d.appspot.com",
    })
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Firebase is properly initialized
    if (!getApps().length) {
      return NextResponse.json({ error: "Firebase not initialized. Check environment variables." }, { status: 500 })
    }

    // Check required environment variables (use variable names)
    const requiredEnvVars = [
      "FIREBASE_PROJECT_ID",
      "FIREBASE_CLIENT_EMAIL",
      "FIREBASE_PRIVATE_KEY",
      "FIREBASE_STORAGE_BUCKET",
    ]
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        return NextResponse.json({ error: `Missing environment variable: ${envVar}` }, { status: 500 })
      }
    }

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
    const fileName = `project-images/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
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

    return NextResponse.json({
      url: publicUrl,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Upload error:", error)

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes("credential")) {
        return NextResponse.json({ error: "Firebase authentication failed. Check your credentials." }, { status: 500 })
      }
      if (error.message.includes("bucket")) {
        return NextResponse.json({ error: "Storage bucket not found. Check FIREBASE_STORAGE_BUCKET." }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Failed to upload file. Please try again." }, { status: 500 })
  }
}

console.log("BUCKET:", process.env.FIREBASE_STORAGE_BUCKET)
