import z from "zod";

export namespace UserTypes {
  export const SOnboardUser = z.object({
    name: z.string(),
    role: z.enum(["user", "doctor", "insurer"]),
  });

  export type TOnboardUser = z.infer<typeof SOnboardUser>;
}
