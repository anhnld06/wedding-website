import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { z } from "zod";
import { MESSAGES } from "@/constants";

const bodySchema = z.object({ password: z.string().min(1) });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = bodySchema.parse(body);

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: MESSAGES.invalidPassword },
        { status: 401 }
      );
    }

    await createSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: MESSAGES.passwordRequired },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: MESSAGES.loginFailed },
      { status: 500 }
    );
  }
}
