import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger as honoLogger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "~/env";
import { auth } from "~/lib/auth/server";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/init";

const app = new Hono().basePath("/api");

app.use(honoLogger(), prettyJSON(), secureHeaders());

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    endpoint: "/api/trpc",
    createContext: createTRPCContext,
  }),
);

app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export const GET = handle(app);
export const POST = handle(app);
