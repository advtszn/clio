import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "hono";
import { db } from "~/config/db";
import superjson from "superjson";
import { logger } from "@clio/logger";
import { auth } from "~/config/auth";

export type TRPCContext = {
  db: typeof db;
  headers: Headers;
};

export const createTRPCContext = async (
  _: unknown,
  c: Context,
): Promise<TRPCContext> => ({
  db,
  headers: c.req.raw.headers,
});

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  logger.debug(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const isAuthenticated = t.middleware(async ({ ctx: { headers }, next }) => {
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Session token is missing or invalid",
    });
  }

  return next({ ctx: { user: session.user, session: session.session } });
});

export const publicProcedure = t.procedure.use(timingMiddleware);
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(isAuthenticated);
