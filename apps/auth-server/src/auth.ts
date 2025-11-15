import { createAuth } from "@clio/auth/server";

export const auth = createAuth("auth-server", process.env.BASE_URL!);
