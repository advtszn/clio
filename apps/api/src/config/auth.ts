import { createAuth } from "@clio/auth/server";
import { env } from "../env";

export const auth = createAuth("api", env.AUTH_URL);
