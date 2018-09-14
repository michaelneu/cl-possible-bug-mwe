import * as express from "express";
import * as directline from "offline-directline";
import { config } from "./config";

export const startOfflineDirectline = (server: express.Express) => {
  const port = config.botPort;
  const serviceUrl = `http://127.0.0.1:${port}`;
  const botUrl = `http://127.0.0.1:${port}/api/messages`;
  const conversationInitRequired = false;

  directline.initializeRoutes(server, serviceUrl, botUrl, conversationInitRequired, port);
};
