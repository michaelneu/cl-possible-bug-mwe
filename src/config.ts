import { ICLOptions } from "@conversationlearner/sdk";
import * as convict from "convict";
import * as dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
  throw new Error(`Error loading .env configuration: ${result.error}`);
}

export enum NodeEnvironment {
  Development = "development",
  Production = "production",
}

interface IConversationlearnerConfiguration extends ICLOptions {
  conversationLearnerAppId: string | undefined;
  botPort: any;
  botFrameworkAppId: string | undefined;
  botFrameworkAppPassword: string | undefined;
  NODE_ENV: NodeEnvironment;
}

type IConversationlearnerConfigurationSchema = {
  [P in keyof IConversationlearnerConfiguration]: convict.SchemaObj<any>;
};

const configSchema = convict({
  APIM_SUBSCRIPTION_KEY: {
    default: undefined,
    env: "APIM_SUBSCRIPTION_KEY",
    format: String,
  },
  CONVERSATION_LEARNER_SDK_PORT: {
    default: 5000,
    env: "CONVERSATION_LEARNER_SDK_PORT",
    format: "port",
  },
  CONVERSATION_LEARNER_SERVICE_URI: {
    default: "https://westus.api.cognitive.microsoft.com/conversationlearner/v1.0/",
    env: "CONVERSATION_LEARNER_SERVICE_URI",
    format: "url",
  },
  CONVERSATION_LEARNER_UI_PORT: {
    default: 5050,
    env: "CONVERSATION_LEARNER_UI_PORT",
    format: "port",
  },
  DOL_BOT_URL: {
    default: "http://127.0.0.1:3978/api/messages",
    env: "DOL_BOT_URL",
    format: "url",
  },
  DOL_SERVICE_URL: {
    default: "http://127.0.0.1:3000",
    env: "DOL_SERVICE_URL",
    format: "url",
  },
  DOL_START: {
    default: true,
    env: "DOL_START",
    format: Boolean,
  },
  LUIS_AUTHORING_KEY: {
    default: undefined,
    env: "LUIS_AUTHORING_KEY",
    format: String,
  },
  LUIS_SUBSCRIPTION_KEY: {
    default: undefined,
    env: "LUIS_SUBSCRIPTION_KEY",
    format: String,
  },
  NODE_ENV: {
    default: NodeEnvironment.Development,
    env: "NODE_ENV",
    format: String,
  },
  botFrameworkAppId: {
    default: undefined,
    env: "MICROSOFTAPPID",
    format: String,
  },
  botFrameworkAppPassword: {
    default: undefined,
    env: "MICROSOFTAPPPASSWORD",
    format: String,
  },
  botPort: {
    default: 3978,
    env: "PORT",
    // Must be any type because when deployed port will be named pipe path instead of number
    // E.g. \\.\pipe\959e6a63-76dd-4f11-be42-d29ec0fc585d
    format: "*",
  },
  conversationLearnerAppId: {
    default: undefined,
    env: "CONVERSATION_LEARNER_APP_ID",
    format: String,
  },
} as IConversationlearnerConfigurationSchema);

configSchema.validate({
  allowed: "strict",
});

export const config: IConversationlearnerConfiguration = configSchema.getProperties();
