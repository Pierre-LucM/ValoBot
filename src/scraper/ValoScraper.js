"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValoScraper = void 0;
const Axios_services_1 = require("../core/Axios.services");
const Routes_1 = require("../Routes/Routes");
const axios_1 = require("axios");
class ValoScraper {
    accountDataUsefull;
    accountContent;
    mmrContent;
    mmrDataUsefull;
    axiosServices;
    error;
    constructor() {
        this.axiosServices = new Axios_services_1.AxiosServices(new axios_1.Axios(), new Routes_1.Routes());
        this.accountContent = { name: '', tag: '', region: '', account_level: -1 };
        this.mmrContent = {
            name: '',
            tag: '',
            data: {
                currenttier: -1,
                currenttierpatched: '',
                ranking_in_tier: -1,
                mmr_change_to_last_game: null,
                elo: null,
            }
        };
        this.error = '';
    }
    async accountDataParse(value) {
        this.axiosServices.accountDataValue = await value;
        await this.axiosServices.accountData.then(async (result) => {
            let accountDataParsed;
            accountDataParsed = await JSON.parse(result.data);
            if (accountDataParsed.status != 200) {
                this.error = this.parseError();
            }
            else {
                this.accountDataUsefull = await accountDataParsed.data;
            }
        });
        return this.error === '' ? this.parseAccountData(this.accountDataUsefull) : this.error;
    }
    async mmrDataParse(value) {
        this.axiosServices.mmrDataValue = await value;
        await this.axiosServices.mmrData.then((result) => {
            let mmrDataParsed;
            mmrDataParsed = JSON.parse(result.data);
            if (mmrDataParsed.status != 200) {
                this.error = this.parseError();
            }
            else {
                this.mmrDataUsefull = mmrDataParsed.data;
            }
        });
        return this.error === '' ? this.parseMmrData(this.mmrDataUsefull) : this.error;
    }
    parseAccountData(data) {
        this.accountContent.name = data.name;
        this.accountContent.tag = data.tag;
        this.accountContent.account_level = data.account_level;
        this.accountContent.region = data.region;
        return this.accountContent;
    }
    parseMmrData(data) {
        this.mmrContent.name = data.name;
        this.mmrContent.tag = data.tag;
        this.mmrContent.data.currenttier = data.currenttier;
        this.mmrContent.data.elo = data.elo;
        this.mmrContent.data.currenttierpatched = data.currenttierpatched;
        this.mmrContent.data.mmr_change_to_last_game = data.mmr_change_to_last_game;
        this.mmrContent.data.ranking_in_tier = data.ranking_in_tier;
        return this.mmrContent;
    }
    parseError() {
        return "An error occured may be wrong username or tag";
    }
}
exports.ValoScraper = ValoScraper;
//# sourceMappingURL=ValoScraper.js.map