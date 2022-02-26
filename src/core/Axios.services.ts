import {Axios, AxiosResponse} from "axios";
import {Routes} from "../Routes/Routes";
import {IAccountData, IMatchHistory, IMmrData} from "../Routes/InterfaceRoutes";
import {IResponseAccount, IResponseMatchHistory, IResponseMmr} from "./InterfaceResponse";

export class AxiosServices {
    constructor(private readonly axiosService: Axios, private readonly routes: Routes) {
        this.axiosService = new Axios({
            headers: {}
        });
        this.routes = new Routes();
    }

    get accountData(): Promise<AxiosResponse<IResponseAccount>> {
        return this.axiosService.get(this.routes.accountDataRoute);
    }

    set accountDataValue(value: IAccountData) {
        this.routes.accountDataValue = value;
    }

    get mmrData(): Promise<AxiosResponse<IResponseMmr>> {
        return this.axiosService.get(this.routes.mmrDataRoute);
    }

    set mmrDataValue(value: IMmrData) {
        this.routes.mmrDataValue = value;
    }
    //TODO match history data
    get matchHistoryData(): Promise<AxiosResponse<IResponseMatchHistory>> {
        return this.axiosService.get(this.routes.matchHistoryDataRoute);
    }

    set matchHistoryDataValue(value: IMatchHistory) {
        this.routes.matchHistoryDataValue = value;
    }
}