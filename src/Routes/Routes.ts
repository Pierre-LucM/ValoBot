import {IAccountData, IMatchHistory, IMmrData} from "./InterfaceRoutes";

export class Routes {
    private readonly apiRoute: string = 'https://api.henrikdev.xyz/valorant/'
    private accountData: string;
    private mmrData: string;
    private matchHistoryData: string;

    constructor() {
    }

    get accountDataRoute(): string {// return url to get account data
        return this.apiRoute + this.accountData;
    }

    get mmrDataRoute(): string { // return url to get mmr data
        return this.apiRoute + this.mmrData;
    }

    get matchHistoryDataRoute() { // return url to get match history data
        return this.apiRoute + this.matchHistoryData;
    }

    set mmrDataValue(value: IMmrData) {
        this.mmrData = `v1/mmr/${value.region}/${value.name}/${value.tag}`;
    }

    set accountDataValue(value: IAccountData) {
        this.accountData = `v1/account/${value.name}/${value.tag}`;
    }

    set matchHistoryDataValue(value: IMatchHistory) {
        this.matchHistoryData = `/v3/matches/${value.region}/${value.name}/${value.tag}`
    }
}