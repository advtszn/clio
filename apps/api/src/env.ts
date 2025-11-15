import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    ALLOWED_ORIGINS: z.string(),
    DATABASE_URL: z.url(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    AUTH_SECRET: z.string(),
    AUTH_URL: z.url(),
    PORT: z.coerce.number().default(3001),
  },
  runtimeEnv: process.env,
});
