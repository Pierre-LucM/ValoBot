"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MmrData = void 0;
const discord_js_1 = require("discord.js");
const ValoScraper_1 = require("../scraper/ValoScraper");
const builders_1 = require("@discordjs/builders");
exports.MmrData = {
    data: new builders_1.SlashCommandBuilder()
        .setName("mmr")
        .setDescription("get rank data")
        .addSubcommand((command) => command.setName("rank").setDescription("retrieve player rank data").addStringOption((option) => option.setName("pseudo_valo").setDescription("valorant username i.e. Sova").setRequired(true))
        .addStringOption((option) => option.setName("tag").setDescription("valorant tag without # i.e VAL").setRequired(true))),
    run: async (client, interaction) => {
        let args = interaction.options.data.map(i => i.options.map(t => t.value.toString()));
        let valoScraper = new ValoScraper_1.ValoScraper();
        let accountContent = await valoScraper.accountDataParse({
            name: args[0][0],
            tag: args[0][1]
        });
        let content;
        if (accountContent === "An error occured may be wrong username or tag" && typeof accountContent === "string") {
            content = accountContent;
            await interaction.followUp({
                ephemeral: true,
                content
            });
        }
        else {
            accountContent = accountContent;
            let mmrContent = await valoScraper.mmrDataParse({
                name: args[0][0],
                tag: args[0][1],
                region: accountContent.region
            });
            if (mmrContent === "An error occured may be wrong username or tag" && typeof mmrContent === "string") {
                content = mmrContent;
                await interaction.followUp({
                    ephemeral: true,
                    content
                });
            }
            else {
                mmrContent = mmrContent;
                content = new discord_js_1.MessageEmbed().setColor('#FF0000').setTitle('Valorant account information').addFields([{
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
};
//# sourceMappingURL=MmrData.js.map