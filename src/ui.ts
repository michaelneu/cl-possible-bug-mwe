import { startUiServer } from "@conversationlearner/sdk";
import { config } from "./config";

startUiServer(config.CONVERSATION_LEARNER_UI_PORT);
