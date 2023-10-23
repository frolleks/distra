import { auth } from "@/lib/auth/lucia";
import { LuciaError } from "lucia";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (request: Request) => {
  const schema = z.object({
    username: z.string().min(2).max(32),
    password: z.string().min(8),
  });
  const body = await request.json();
  const validatedBody = schema.safeParse(body);

  try {
    if (!validatedBody.success) {
      throw new Error("Invalid username or password");
    }

    const key = await auth.useKey(
      "username",
      validatedBody.data.username.toLowerCase(),
      validatedBody.data.password
    );
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);

    return new Response(null, {
      headers: {
        Location: "/",
        "Set-Cookie": sessionCookie.serialize(),
      },
      status: 302,
    });
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
