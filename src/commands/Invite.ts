import {Command} from "../Command";
import {BaseCommandInteraction, Client, MessageEmbed} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

export const Invite: Command = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription("return invite link")
    , run: async (client: Client, interaction: BaseCommandInteraction) => {

        const content = new MessageEmbed().setColor('#FF0000').setTitle('Invite Link').addFields([{
            name: 'Invite link',
            value: 'https://discord.com/api/oauth2/authorize?client_id=947105843759964160&permissions=2147552256&scope=bot%20applications.commands',
            inline:true
        }]);
        await interaction.followUp({
            ephemeral: true,
            embeds: [content]
        });

    }
};