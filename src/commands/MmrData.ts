import {Command} from "../Command";
import {BaseCommandInteraction, Client, MessageEmbed} from "discord.js";
import {ValoScraper} from '../scraper/ValoScraper';
import {IAccountContent, IMmrContent} from "../scraper/InterfaceContent";
import {SlashCommandBuilder} from "@discordjs/builders";

export const MmrData: Command = {
        data: new SlashCommandBuilder()
            .setName("mmr")
            .setDescription("get rank data")
            .addSubcommand((command) =>
                command.setName("rank").setDescription("retrieve player rank data").addStringOption((option) =>
                    option.setName("pseudo_valo").setDescription("valorant username i.e. Sova").setRequired(true))
                    .addStringOption((option) =>
                        option.setName("tag").setDescription("valorant tag without # i.e VAL").setRequired(true)))
        ,
        run: async (client: Client, interaction: BaseCommandInteraction) => {
            let args: Array<Array<string>> = interaction.options.data.map(i => i.options.map(t => t.value.toString()));
            let valoScraper: ValoScraper = new ValoScraper();
            let accountContent: IAccountContent | string = await valoScraper.accountDataParse({
                name: args[0][0],
                tag: args[0][1]
            });
            let content
            if (accountContent === "An error occured may be wrong username or tag" && typeof accountContent === "string") {
                content = accountContent;
                await interaction.followUp({
                    ephemeral: true,
                    content
                })
            } else {
                accountContent = accountContent as IAccountContent;
                let mmrContent: IMmrContent | string = await valoScraper.mmrDataParse({
                    name: args[0][0],
                    tag: args[0][1],
                    region: accountContent.region
                });
                if (mmrContent === "An error occured may be wrong username or tag" && typeof mmrContent === "string") {
                    content = mmrContent;
                    await interaction.followUp({
                        ephemeral: true,
                        content
                    })
                } else {
                    mmrContent = mmrContent as IMmrContent;
                    content = new MessageEmbed().setColor('#FF0000').setTitle('Valorant account information').addFields([{
                        name: 'Name :',
                        value: accountContent.name,
                        inline: true
                    }, {
                        name: 'Tag :',
                        value: accountContent.tag,
                        inline: true
                    }, {
                        name: 'Region :',
                        value: accountContent.region,
                    }, {
                        name: 'Level :',
                        value: accountContent.account_level.toString(10),
                        inline: true
                    }, {
                        name: 'Rank :',
                        value: mmrContent.data.currenttierpatched,

                    }, {
                        name: 'Rank Rating :',
                        value: mmrContent.data.ranking_in_tier.toString(10),
                        inline: true
                    }, {
                        name: 'Elo :',
                        value: mmrContent.data.elo.toString(10),
                        inline: true
                    }, {
                        name: 'Last Rank Rating update :',
                        value: mmrContent.data.mmr_change_to_last_game.toString(10),
                    },
                    ]);
                    await interaction.followUp({
                        ephemeral: true,
                        embeds: [content]
                    });
                }
            }
        }
    }
;