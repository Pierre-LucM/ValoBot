import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";
import {Client} from "discord.js";
import {CommandList} from "./Commands";
import {config} from "dotenv";

config()
export const onReady = async (BOT: Client) => {
    const rest = new REST({version: "9"}).setToken(
        process.env.AUTH_TOKEN as string
    );

    const commandData = CommandList.map((command) => command.data.toJSON());

    await rest.put(
        Routes.applicationCommands(
            process.env.APP_ID),
        {body: commandData}
    );
    console.log("Discord ready!");
};