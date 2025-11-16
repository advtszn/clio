import { createAuthClient } from "better-auth/react";

export const createAuth = (baseURL: string) =>
  createAuthClient({ baseURL, fetchOptions: { credentials: "include" } });
