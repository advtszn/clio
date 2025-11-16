import { Context } from "hono";
import { db } from "../db";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { auth } from "~/lib/auth/server";

export type TRPCContext = { db: typeof db; headers: Headers };

export const createTRPCContext = async (
  _: unknown,
  c: Context,
): Promise<TRPCContext> => ({ db, headers: c.req.raw.headers });

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

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

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
