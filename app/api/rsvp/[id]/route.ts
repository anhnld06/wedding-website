import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

    const rsvp = await prisma.rSVP.findUnique({ where: { id } });
    if (!rsvp) {
      return NextResponse.json({ error: MESSAGES.rsvpNotFound }, { status: 404 });
    }

    await prisma.rSVP.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: MESSAGES.failedDeleteRsvp },
      { status: 500 }
    );
  }
}
