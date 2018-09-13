import { ClientMemoryManager, ConversationLearner } from "@conversationlearner/sdk";
import { BotFrameworkAdapter, FileStorage } from "botbuilder";
import { join } from "path";
import { config } from "./config";

export const botAdapter = new BotFrameworkAdapter({
  appId: config.botFrameworkAppId,
  appPassword: config.botFrameworkAppPassword,
});

const storage = new FileStorage(join(__dirname, "storage"));
export const router = ConversationLearner.Init(config, storage);
export const conversationLearner = new ConversationLearner(config.conversationLearnerAppId);

enum Entities {
  State = "state",
}

enum StateValue {
  Foo = "foo",
  Bar = "bar",
}

conversationLearner.AddCallback({
  name: "FetchState",
  logic: async (memoryManager: ClientMemoryManager) => {
    const value = StateValue.Foo;
    // const value = StateValue.Bar;

    memoryManager.RememberEntity(Entities.State, value);
    
    return `set ${Entities.State} = ${value}`;
  },
  render: async (result) => result,
});
