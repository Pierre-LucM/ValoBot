import {IMmr} from "../core/InterfaceResponse";

export interface InterfaceContent {
    name: string,
    tag: string;
}

export interface IAccountContent extends InterfaceContent {
    region: string,
    account_level: number,
}

export interface IMmrContent extends InterfaceContent {
    data: Partial<IMmr>
}
