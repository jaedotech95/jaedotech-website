import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, message: "파일이 없습니다." }, { status: 400 })
    }

    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
    })

    return NextResponse.json({
      success: true,
      fileData: {
        name: file.name,
        size: file.size,
        type: file.type,
        url: blob.url,
      },
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ success: false, message: "파일 업로드 중 오류가 발생했습니다." }, { status: 500 })
  }
}
