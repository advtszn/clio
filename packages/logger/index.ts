import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  ...(process.env.NODE_ENV === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
        messageFormat: true,
        hideObject: false,
      },
    },
  }),
});
