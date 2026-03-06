import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/validations";
import { checkRsvpHarmful } from "@/lib/moderation";
import { MESSAGES } from "@/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = rsvpSchema.parse(body);

    // Moderation: kiểm tra nội dung có hại (tiếng Việt) trước khi lưu
    const { safe, reason } = checkRsvpHarmful(
      validated.name,
      validated.message
    );
    if (!safe) {
      return NextResponse.json(
        { error: reason ?? MESSAGES.contentNotAppropriate },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name: validated.name,
        attending: validated.attending,
        guests: validated.guests,
        message: validated.message || null,
      },
    });

    return NextResponse.json(
      { message: MESSAGES.rsvpSuccess, id: rsvp.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: MESSAGES.invalidInput, details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: MESSAGES.rsvpSubmitError },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rsvps = await prisma.rSVP.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rsvps);
  } catch {
    return NextResponse.json(
      { error: MESSAGES.rsvpFetchError },
      { status: 500 }
    );
  }
}
