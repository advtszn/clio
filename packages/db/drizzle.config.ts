import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
  out: "./src/migrations",
  schema: "./src/schema/index.ts",
  casing: "snake_case",
} satisfies Config;
