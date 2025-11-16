import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger as honoLogger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "~/env";
import { auth } from "~/lib/auth/server";

const app = new Hono().basePath("/api");

app.use(
  honoLogger(),
  prettyJSON(),
  secureHeaders(),
  cors({
    origin: env.ALLOWED_ORIGINS.split(","),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Authorization",
      "Content-Type",
      "accept-language",
      "Cookie",
    ],
    maxAge: 34560000,
  }),
);

app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export const GET = handle(app);
export const POST = handle(app);
