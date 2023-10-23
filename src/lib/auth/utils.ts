import { eq } from "drizzle-orm";
import { db } from "../db";
import { auth } from "./lucia";

export async function getSession(ctx: any) {
  const authRequest = auth.handleRequest("GET", ctx);
  const session = await (authRequest.validate() ||
    authRequest.validateBearerToken());

  return session;
}

export async function getUser(ctx: any) {
  const session = await getSession(ctx);
  const user = await db.query.user.findFirst({
    where: eq(session.user.userId, session.user.userId),
  });

  return user;
}
