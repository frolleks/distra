import { auth } from "@/lib/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const schema = z.object({
    username: z.string().min(2).max(32),
    displayName: z.string().min(2).max(32),
    password: z.string().min(8),
  });
  const body = await request.json();
  const validatedBody = schema.safeParse(body);

  if (validatedBody.success) {
    try {
      const user = await auth.createUser({
        key: {
          providerId: "username",
          providerUserId: validatedBody.data.username.toLowerCase(),
          password: validatedBody.data.password,
        },
        attributes: {
          username: validatedBody.data.username,
        },
      });

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });

      const authRequest = auth.handleRequest(request.method, context);
      authRequest.setSession(session);

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    } catch (e) {
      const { message } = e as any;

      return NextResponse.json(
        {
          error: message,
        },
        {
          status: 400,
        },
      );
    }
  } else {
    return NextResponse.json(
      {
        error: "Invalid body",
      },
      {
        status: 400,
      },
    );
  }
};
