import {AxiosServices} from "../core/Axios.services";
import {Routes} from "../Routes/Routes";
import {Axios} from "axios";

import {IAccountData, IMmrData} from "../Routes/InterfaceRoutes";
import {IAccount, IMmr, IResponseAccount, IResponseMmr} from "../core/InterfaceResponse";
import {IAccountContent, IMmrContent} from "./InterfaceContent";

export class ValoScraper {
    private accountDataUsefull: IAccount;
    private accountContent: IAccountContent;
    private mmrContent: IMmrContent;
    private mmrDataUsefull: IMmr;
    private readonly axiosServices: AxiosServices;
    private error: string;

    constructor() {
        this.axiosServices = new AxiosServices(new Axios(), new Routes());
        this.accountContent = {name: '', tag: '', region: '', account_level: -1}
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
        }
        this.error = '';
    }

    async accountDataParse(value: IAccountData): Promise<IAccountContent | string> {
        this.axiosServices.accountDataValue = await value;
        await this.axiosServices.accountData.then(async (result) => {
            let accountDataParsed: IResponseAccount;

            accountDataParsed = await JSON.parse(result.data as unknown as string);
            if (accountDataParsed.status != 200) {
                this.error = this.parseError();
            } else {
                this.accountDataUsefull = await accountDataParsed.data;
            }

        });
        return this.error === '' ? this.parseAccountData(this.accountDataUsefull) : this.error;
    }

    async mmrDataParse(value: IMmrData): Promise<IMmrContent | string> {
        this.axiosServices.mmrDataValue = await value;
        await this.axiosServices.mmrData.then((result) => {
            let mmrDataParsed: IResponseMmr;
            mmrDataParsed = JSON.parse(result.data as unknown as string);
            if (mmrDataParsed.status != 200) {
                this.error = this.parseError();
            } else {
                this.mmrDataUsefull = mmrDataParsed.data
            }
        });
        return this.error === '' ? this.parseMmrData(this.mmrDataUsefull) : this.error;
    }

    parseAccountData(data: IAccount): IAccountContent {

        this.accountContent.name = data.name;
        this.accountContent.tag = data.tag;
        this.accountContent.account_level = data.account_level;
        this.accountContent.region = data.region;
        return this.accountContent;
    }

    parseMmrData(data: IMmr): IMmrContent {
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