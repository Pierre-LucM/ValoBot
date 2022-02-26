"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hello = void 0;
const builders_1 = require("@discordjs/builders");
exports.Hello = {
    data: new builders_1.SlashCommandBuilder()
        .setName("hello")
        .setDescription("Returns a greeting"),
    run: async (client, interaction) => {
        const content = "Hello there!";
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
//# sourceMappingURL=Hello.js.map