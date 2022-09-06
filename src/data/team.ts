import { Message } from "./message";

export type TeamInfoType = {
    num: number;
    name: string;
    pickList: Array<Message>;
    curPick: number;
    curBan: number;
};
