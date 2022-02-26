"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountData = void 0;
const discord_js_1 = require("discord.js");
const ValoScraper_1 = require("../scraper/ValoScraper");
const builders_1 = require("@discordjs/builders");
exports.accountData = {
    data: new builders_1.SlashCommandBuilder()
        .setName("get")
        .setDescription("get player data")
        .addSubcommand((command) => command.setName("accountdata").setDescription("retrieve user data").addStringOption((option) => option.setName("pseudo_valo").setDescription("valorant username i.e. Sova").setRequired(true))
        .addStringOption((option) => option.setName("tag").setDescription("valorant tag without # i.e VAL").setRequired(true))),
    run: async (client, interaction) => {
        let args = interaction.options.data.map(i => i.options.map(t => t.value));
        let valoScraper = new ValoScraper_1.ValoScraper();
        let accountContent = await valoScraper.accountDataParse({
            name: args[0][0],
            tag: args[0][1]
        });
        let content;
        if (accountContent === "An error occured may be wrong username or tag" && typeof accountContent !== "object") {
            content = accountContent;
            await interaction.followUp({
                ephemeral: true,
                content
            });
        }
        else {
            accountContent = accountContent;
            content = new discord_js_1.MessageEmbed().setColor('#FF0000').setTitle('Valorant account information').addFields([{
                    name: 'Name : ',
                    value: accountContent.name,
                    inline: true
                }, {
                    name: 'Tag : ',
                    value: accountContent.tag,
                    inline: true
                }, {
                    name: 'Region : ',
                    value: accountContent.region,
                }, {
                    name: 'Level : ',
                    value: accountContent.account_level.toString(10),
                    inline: true
                }]);
            await interaction.followUp({
                ephemeral: true,
                embeds: [content]
            });
        }
    }
};
//# sourceMappingURL=AccountData.js.map