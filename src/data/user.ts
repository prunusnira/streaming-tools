import { Message } from "./message";

export type UserType = {
    userid: string;
    iconurl: string;
    displayname: string;
    sub: boolean;
    picked: boolean;
    recentChat: Message;
    team: number;
};

export type StreamerType = {
    acctok: string;
    userid: string;
    iconurl: string;
    displayname: string;
};

export const emptyUser: UserType = {
    userid: "",
    iconurl: "",
    displayname: "",
    sub: false,
    picked: false,
    recentChat: {
        id: "",
        name: "",
        msg: "",
        time: 0,
        timeInTxt: "",
        ban: false,
    },
    team: 0,
};

export const emptyStreamer: StreamerType = {
    acctok: "",
    userid: "",
    iconurl: "",
    displayname: "",
};
