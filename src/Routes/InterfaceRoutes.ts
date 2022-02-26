export interface IAccountData {
    name: string,
    tag: string;
}

export interface IMmrData extends IAccountData {
    region: string
}

export interface IMatchHistory extends IAccountData {
    region: string
}
