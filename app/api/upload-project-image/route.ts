import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("image") as File

    if (!file) {
      console.error("No file uploaded or file is not a valid File object", file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Ensure /public/projects exists
    const projectsDir = path.join(process.cwd(), "public", "projects")
    try {
      if (!fs.existsSync(projectsDir)) {
        fs.mkdirSync(projectsDir, { recursive: true })
      }
    } catch (dirError) {
      console.error("Failed to create directory:", dirError)
      return NextResponse.json({ error: "Failed to create directory" }, { status: 500 })
    }

    // Save file with unique name
    const ext = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${ext}`
    const filePath = path.join(projectsDir, fileName)
    let buffer
    try {
      buffer = Buffer.from(await file.arrayBuffer())
    } catch (bufferError) {
      console.error("Failed to convert file to buffer:", bufferError)
      return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
    }
    try {
      fs.writeFileSync(filePath, buffer)
    } catch (writeError) {
      console.error("Failed to write file:", writeError)
      return NextResponse.json({ error: "Failed to save file" }, { status: 500 })
    }

    // Return the public path
    return NextResponse.json({ imagePath: `/projects/${fileName}` })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
