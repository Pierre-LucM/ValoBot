"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const InteractionCreate_1 = require("./listener/InteractionCreate");
const Ready_1 = require("./listener/Ready");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const token = ""; // add your token here
console.log("Bot is starting...");
const client = new discord_js_1.Client({
    intents: []
});
(0, Ready_1.default)(client);
(0, InteractionCreate_1.default)(client);
client.login(process.env.AUTH_TOKEN);
//# sourceMappingURL=Bot.js.map