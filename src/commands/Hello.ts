import {BaseCommandInteraction, Client} from "discord.js";
import {Command} from '../Command';
import {SlashCommandBuilder} from "@discordjs/builders";

export const Hello: Command = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Returns a greeting"),
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Hello there!";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};