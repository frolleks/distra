import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

export const queryClient = postgres(process.env.DATABASE_URL as string);
export const db: PostgresJsDatabase = drizzle(queryClient);
