import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import "dotenv/config";

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

async function migrateDb() {
  console.log("Migrating...");
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle",
  });
  console.log("Migration finished");
  process.exit(0);
}

migrateDb();
