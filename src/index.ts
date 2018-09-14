import * as cors from "cors";
import * as express from "express";
import { config, NodeEnvironment } from "./config";
import { router, botAdapter, conversationLearner } from './bot';
import { startOfflineDirectline } from './dol';

const server = express();

server.use(cors());

if (config.NODE_ENV === NodeEnvironment.Development) {
  server.use("/sdk", router);
  startOfflineDirectline(server);
} else {
  server.listen(config.botPort, () => {
    console.log(`now listening on ${config.botPort}`);
  });
}

server.post("/api/messages", (req, res) => {
  botAdapter.processActivity(req, res, async (context) => {
    const result = await conversationLearner.recognize(context);

    if (result) {
      await conversationLearner.SendResult(result);
    }
  });
});
