import {Hello} from "./commands/Hello";
import {accountData} from "./commands/AccountData";
import {Command} from "./Command";
import {MmrData} from "./commands/MmrData";

export const CommandList: Array<Command> = [Hello, accountData, MmrData];
