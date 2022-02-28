import {Hello} from "./commands/Hello";
import {accountData} from "./commands/AccountData";
import {Command} from "./Command";
import {MmrData} from "./commands/MmrData";
import {help} from "./commands/help";
import {Invite} from "./commands/Invite";

export const CommandList: Array<Command> = [Hello, accountData, MmrData,help,Invite];
