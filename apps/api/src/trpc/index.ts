import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "./init";
import { userRouter } from "./routers";

export const appRouter = createTRPCRouter({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
