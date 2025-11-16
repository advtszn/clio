import { env } from "./env";
import { Hono } from "hono";
import { logger as honoLogger } from "hono/logger";
import { logger } from "@clio/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc";
import { createTRPCContext } from "./trpc/init";

const app = new Hono().basePath("/api");

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

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
    endpoint: "/api/trpc",
  }),
);

export default app;
