import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: "file:./src/db/remember.db",
    // url: process.env.DATABASE_URL!,
    // authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
