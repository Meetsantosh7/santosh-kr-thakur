import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    // Create unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}_${originalName}`

    // Ensure the projects directory exists
    const projectsDir = join(process.cwd(), "public", "projects")
    if (!existsSync(projectsDir)) {
      await mkdir(projectsDir, { recursive: true })
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(projectsDir, filename)

    await writeFile(filepath, buffer)

    // Return the public URL path
    const imagePath = `/projects/${filename}`

    return NextResponse.json({
      success: true,
      imagePath,
      message: "Image uploaded successfully",
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
