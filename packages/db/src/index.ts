import postgres from "postgres";

export const dbClient = postgres(process.env.DATABASE_URL!);
