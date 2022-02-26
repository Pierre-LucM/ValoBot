import {Client} from "discord.js";
import {onReady} from "../register";

export default (client: Client): void => {

    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        await onReady(client);
        console.log(`${client.user.username} is online`);

    });
};