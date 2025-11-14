import { betterAuth } from "better-auth";

export const createAuth = (appName: string, baseURL: string) =>
  betterAuth({
    appName,
    baseURL,
    experimental: { joins: true },
    emailAndPassword: { enabled: true },
    user: {
      additionalFields: {
        onboarded: {
          type: "boolean",
          default: false,
          input: true,
          required: true,
          defaultValue: false,
        },
      },
    },
    secret: process.env.AUTH_SECRET!,
    trustedOrigins: process.env.ALLOWED_ORIGINS?.split(","),
  });
