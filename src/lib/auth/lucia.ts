import { lucia } from "lucia";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";

import { queryClient } from "@/lib/db";

export const auth = lucia({
  adapter: postgresAdapter(queryClient, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  env: process.env.NODE_ENV === "development" || "test" ? "DEV" : "PROD",
});
