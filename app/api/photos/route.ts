import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { photoSchema } from "@/lib/validations";
import { MESSAGES } from "@/constants";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(photos);
  } catch {
    return NextResponse.json(
      { error: MESSAGES.fetchPhotosError },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.valid) {
      return NextResponse.json({ error: MESSAGES.unauthorized }, { status: 401 });
    }

    const body = await request.json();
    const validated = photoSchema.parse(body);

    const photo = await prisma.photo.create({
      data: {
        url: validated.url,
        publicId: validated.publicId ?? null,
        width: validated.width ?? null,
        height: validated.height ?? null,
        caption: validated.caption ?? null,
        category: validated.category,
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: MESSAGES.invalidInput, details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: MESSAGES.failedSavePhoto },
      { status: 500 }
    );
  }
}
