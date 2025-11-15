import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { account, session, user, verification } from "@clio/db/schema";

export const createAuth = (appName: string, baseURL: string) =>
  betterAuth({
    appName,
    baseURL,
    experimental: { joins: true },
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        onboarded: {
          type: "boolean",
          default: false,
          input: true,
          required: true,
          defaultValue: false,
        },
        role: {
          type: "string",
          default: false,
          input: true,
          required: true,
          defaultValue: "",
        },
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: { user, account, verification, session },
    }),
    advanced: {
      database: { generateId: false },
    },
    secret: process.env.AUTH_SECRET!,
    trustedOrigins: process.env.ALLOWED_ORIGINS?.split(","),
  });
