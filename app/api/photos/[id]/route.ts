import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/auth";
import { MESSAGES } from "@/constants";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.valid) {
      return NextResponse.json({ error: MESSAGES.unauthorized }, { status: 401 });
    }

    const { id } = await params;

    const photo = await prisma.photo.findUnique({ where: { id } });
    if (!photo) {
      return NextResponse.json({ error: MESSAGES.photoNotFound }, { status: 404 });
    }

    if (photo.publicId) {
      try {
        await cloudinary.uploader.destroy(photo.publicId, {
          invalidate: true,
        });
      } catch {
        // Continue to delete from DB even if Cloudinary fails
      }
    }

    await prisma.photo.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: MESSAGES.failedDeletePhoto },
      { status: 500 }
    );
  }
}
