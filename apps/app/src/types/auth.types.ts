import z from "zod";

export namespace AuthTypes {
  export type TAuthModes = "sign-in" | "sign-up";

  export const SAuthSchema = z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&_]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &, _)"
      ),
  });

  export type TAuthSchema = z.infer<typeof SAuthSchema>;
}
