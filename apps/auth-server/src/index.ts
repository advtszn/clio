import { env } from "./env";
import { Hono } from "hono/tiny";
import { auth } from "./auth";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "@clio/logger";
import { serve } from "bun";

const app = new Hono();

app.use(
  honoLogger((...args: Parameters<typeof logger.info>) => logger.info(...args)),
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

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const server = serve({
  fetch: app.fetch,
  port: env.PORT,
  idleTimeout: 60,
});

logger.info(`Server running at ${server.hostname}:${server.port}`);

process.on("SIGINT", () => {
  server.stop();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.stop();
});
