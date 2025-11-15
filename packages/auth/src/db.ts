import { dbClient } from "@clio/db";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@clio/db/schema";

export const db = drizzle(dbClient, { schema });
