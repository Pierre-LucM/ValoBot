export interface IResponse {
    status: number,
    name?: string,
    tag?: string,
    message?: string,
}

export interface IAccount {
    puuid: string,
    region: string,
    account_level: number,
    name: string,
    tag: string,
    card: {
        small: string,
        large: string,
        wide: string,
        id: string
    },
    last_update: string
}

export interface IResponseAccount extends IResponse {
    data: IAccount
}

export interface IMmr {
    currenttier: number,
    currenttierpatched: string,
    ranking_in_tier: number,
    mmr_change_to_last_game: number,
    elo: number,
    name: string,
    tag: string
}

export interface IResponseMmr extends IResponse {
    data: IMmr
}

export interface IRMatchHistory {
    currenttier: number,
    currenttierpatched: string,
    ranking_in_tier: number,
    mmr_change_to_last_game: number,
    elo: number,
    date: string,
    date_raw: number
}

export interface IResponseMatchHistory extends IResponse {
    data: Array<IRMatchHistory>;
}