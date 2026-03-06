import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PHOTO_CATEGORIES } from "@/lib/validations";
import { MESSAGES } from "@/constants";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB - buffer for compressed files (client targets 5MB)
const MAX_DIMENSION = 2048; // Max width/height for display
const JPEG_QUALITY = 85;

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.valid) {
      return NextResponse.json({ error: MESSAGES.unauthorized }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const caption = formData.get("caption") as string | null;
    const category = (formData.get("category") as string) || "wedding";

    if (!file || !file.size) {
      return NextResponse.json(
        { error: MESSAGES.selectImageFile },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: MESSAGES.imageSizeLimit },
        { status: 400 }
      );
    }

    if (!PHOTO_CATEGORIES.includes(category as (typeof PHOTO_CATEGORIES)[number])) {
      return NextResponse.json(
        { error: MESSAGES.invalidInput },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resized = await sharp(buffer)
      .resize(MAX_DIMENSION, MAX_DIMENSION, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY })
      .toBuffer();

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "wedding" },
        (err, result) => {
          if (err) reject(err);
          else if (!result) reject(new Error("Upload failed"));
          else resolve(result);
        }
      );
      Readable.from(resized).pipe(uploadStream);
    });

    const photo = await prisma.photo.create({
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        caption: caption?.trim() || null,
        category: category as (typeof PHOTO_CATEGORIES)[number],
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: MESSAGES.failedUploadImage },
      { status: 500 }
    );
  }
}
