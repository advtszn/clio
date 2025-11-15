import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    ALLOWED_ORIGINS: z.string(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.url(),
    AUTH_SECRET: z.string(),
    BASE_URL: z.url(),
  },
  runtimeEnv: process.env,
});
