import { Hono } from "hono/tiny";
import { auth } from "./auth"; // path to your auth file
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { env } from "./env";

const app = new Hono();

app.use(
  logger(),
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
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export default { port: 3002, ...app };
