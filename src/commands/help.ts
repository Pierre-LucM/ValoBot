import {Command} from "../Command";
import {BaseCommandInteraction, Client, MessageEmbed} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

export const help: Command = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("list available command")
    , run: async (client: Client, interaction: BaseCommandInteraction) => {

        const content = new MessageEmbed().setColor('#FF0000').setTitle('Help').addFields([{
            name: 'Rank command',
            value: '/mmr rank',
            inline:true
        }, {
            name:'/mmr rank Command parameters',
            value: 'pseudo_valo: valorant username, tag: valorant tag'
        }, {
            name: 'Account command',
            value: '/get accountdata',
            inline: true
        },{
            name:'/get accountdata Command parameters',
            value: 'pseudo_valo: valorant username, tag: valorant tag'
        }]);
        await interaction.followUp({
            ephemeral: true,
            embeds: [content]
        });

    }
};