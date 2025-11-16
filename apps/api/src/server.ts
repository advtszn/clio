// import { env } from "./env";
// import { logger } from "@clio/logger";
// import app from "./app";
// import { serve } from "bun";

// const server = serve({
//   fetch: app.fetch,
//   port: env.PORT,
//   idleTimeout: 60,
// });

// logger.info(`Server running at ${server.hostname}:${server.port}`);

// process.on("SIGINT", () => {
//   server.stop();
//   process.exit(0);
// });
// process.on("SIGTERM", () => {
//   server.stop();
// });
