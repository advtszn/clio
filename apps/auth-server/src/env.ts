import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    ALLOWED_ORIGINS: z.string(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.url(),
    AUTH_SECRET: z.string(),
    PORT: z.coerce.number().default(3002),
  },
  runtimeEnv: process.env,
});
