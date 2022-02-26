"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("../register");
exports.default = (client) => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        await (0, register_1.onReady)(client);
        console.log(`${client.user.username} is online`);
    });
};
//# sourceMappingURL=Ready.js.map