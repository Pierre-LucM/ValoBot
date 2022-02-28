import {Command} from "../Command";
import {BaseCommandInteraction, Client, MessageAttachment, MessageEmbed} from "discord.js";
import {ValoScraper} from '../scraper/ValoScraper';
import {IAccountContent, IMmrContent} from "../scraper/InterfaceContent";
import {SlashCommandBuilder} from "@discordjs/builders";
import fs from 'fs'

export const MmrData: Command = {
        data: new SlashCommandBuilder()
            .setName("mmr")
            .setDescription("get rank data")
            .addSubcommand((command) =>
                command.setName("rank").setDescription("retrieve player rank data").addStringOption((option) =>
                    option.setName("pseudo_valo").setDescription("valorant username i.e. Sova").setRequired(true))
                    .addStringOption((option) =>
                        option.setName("tag").setDescription("valorant tag  i.e #VAL or VAL").setRequired(true)))
        ,
        run: async (client: Client, interaction: BaseCommandInteraction) => {
            let args: Array<Array<string>> = interaction.options.data.map(i => i.options.map(t => t.value.toString()));
            let valoScraper: ValoScraper = new ValoScraper();
            let argument = args[0][1].split('#').length>0?args[0][1].split('#')[args[0][1].split('#').length-1]:args[0][1];
            let accountContent: IAccountContent | string = await valoScraper.accountDataParse({
                name: args[0][0],
                tag: argument
            });
            let content;
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
                    tag: argument,
                    region: accountContent.region
                });
                if (mmrContent === "An error occured may be wrong username or tag" && typeof mmrContent === "string") {
                    content = mmrContent;
                    await interaction.followUp({
                        ephemeral: true,
                        content
                    })
                } else {
                    let dataJson= await JSON.parse(await fs.promises.readFile('src/rankPathImg.json', {
                        encoding: 'utf8',
                        flag: 'r'
                    }))
                    mmrContent = mmrContent as IMmrContent;
                    let splitmmrContent = mmrContent.data.currenttierpatched.split(' ')
                    const filename = await  dataJson.ranks[splitmmrContent[0].toLowerCase()+splitmmrContent[1]].filename;
                    content = new MessageEmbed().setColor('#FF0000').setTitle('Valorant account information').setThumbnail("attachment://valo_icon.png").addFields([{
                        name: 'Name :',
                        value: accountContent.name,
                        inline: true
                    }, {
                        name: 'Tag :',
                        value: accountContent.tag,
                        inline: true
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
                    }
                    ]).setImage('attachment://' + filename);//(data.ranks[mmrContent.data.currenttierpatched.split(' ')[0].toLowerCase() + mmrContent.data.currenttierpatched.split(' ')[1].toLowerCase()].path);//.setImage(].path);

                    await interaction.followUp({
                        ephemeral: true,
                        embeds: [content],
                        files: [dataJson.ranks[splitmmrContent[0].toLowerCase()+splitmmrContent[1]]?.path,"src/valo_icon.png"]
                    });
                }
            }
        }
    }
;