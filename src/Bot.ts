import { Client, ClientOptions } from "discord.js";
import interactionCreate from "./listener/InteractionCreate";
import ready from "./listener/Ready";
import {config} from "dotenv";
config();
const token = ""; // add your token here

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client);

client.login(process.env.AUTH_TOKEN);
