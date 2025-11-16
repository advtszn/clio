import { dbClient } from "@clio/db";
import { drizzle } from "@clio/db/orm";
import * as schema from "@clio/db/schema";

export const db = drizzle(dbClient, { schema });
