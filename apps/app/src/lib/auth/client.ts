import { createAuth } from "@clio/auth/client";
import { env } from "~/env";

export const auth = createAuth(env.NEXT_PUBLIC_AUTH_URL)