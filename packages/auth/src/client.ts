import { createAuthClient } from "better-auth/client";

export const createAuth = (baseURL: string) =>
  createAuthClient({ baseURL, fetchOptions: { credentials: "include" } });
