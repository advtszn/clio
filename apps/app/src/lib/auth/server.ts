import { createAuth } from "@clio/auth/server";
import { env } from "~/env";

export const auth = createAuth("web", env.NEXT_PUBLIC_AUTH_URL);
