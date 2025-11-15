import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { user as userSchema } from "@clio/db/schema";
import { eq } from "@clio/db/orm";
import { TRPCError } from "@trpc/server";
import { UserTypes } from "~/types/user.types";

export const userRouter = createTRPCRouter({
  onboard: protectedProcedure
    .input(UserTypes.SOnboardUser)
    .mutation(async ({ ctx: { db, user }, input: { name, role } }) => {
      try {
        await db
          .update(userSchema)
          .set({ name, role, onboarded: true })
          .where(eq(userSchema.id, user.id));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to onboard user",
        });
      }
    }),
});
