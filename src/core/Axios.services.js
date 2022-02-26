"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosServices = void 0;
const axios_1 = require("axios");
const Routes_1 = require("../Routes/Routes");
class AxiosServices {
    axiosService;
    routes;
    constructor(axiosService, routes) {
        this.axiosService = axiosService;
        this.routes = routes;
        this.axiosService = new axios_1.Axios({
            headers: {}
        });
        this.routes = new Routes_1.Routes();
    }
    get accountData() {
        return this.axiosService.get(this.routes.accountDataRoute);
    }
    set accountDataValue(value) {
        this.routes.accountDataValue = value;
    }
    get mmrData() {
        return this.axiosService.get(this.routes.mmrDataRoute);
    }
    set mmrDataValue(value) {
        this.routes.mmrDataValue = value;
    }
    get matchHistoryData() {
        return this.axiosService.get(this.routes.matchHistoryDataRoute);
    }
    set matchHistoryDataValue(value) {
        this.routes.matchHistoryDataValue = value;
    }
}
exports.AxiosServices = AxiosServices;
//# sourceMappingURL=Axios.services.js.map