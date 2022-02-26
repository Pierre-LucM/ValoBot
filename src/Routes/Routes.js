"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    apiRoute = 'https://api.henrikdev.xyz/valorant/';
    accountData;
    mmrData;
    matchHistoryData;
    constructor() {
    }
    get accountDataRoute() {
        return this.apiRoute + this.accountData;
    }
    get mmrDataRoute() {
        return this.apiRoute + this.mmrData;
    }
    get matchHistoryDataRoute() {
        return this.apiRoute + this.matchHistoryData;
    }
    set mmrDataValue(value) {
        this.mmrData = `v1/mmr/${value.region}/${value.name}/${value.tag}`;
    }
    set accountDataValue(value) {
        this.accountData = `v1/account/${value.name}/${value.tag}`;
    }
    set matchHistoryDataValue(value) {
        this.matchHistoryData = `/v3/matches/${value.region}/${value.name}/${value.tag}`;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map