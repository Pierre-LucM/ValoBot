"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const Commands_1 = require("./Commands");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const onReady = async (BOT) => {
    const rest = new rest_1.REST({ version: "9" }).setToken(process.env.AUTH_TOKEN);
    const commandData = Commands_1.CommandList.map((command) => command.data.toJSON());
    await rest.put(v9_1.Routes.applicationCommands(process.env.APP_ID), { body: commandData });
    console.log("Discord ready!");
};
exports.onReady = onReady;
//# sourceMappingURL=register.js.map