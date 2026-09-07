import type { AuthProvider } from "@streaming-tools/auth";

export type Message = {
    id: string;
    name: string;
    msg: string;
    time: number;
    timeInTxt: string;
    ban: boolean;
    provider?: AuthProvider;
};

export const emptyMessage: Message = {
    id: "",
    name: "",
    msg: "",
    time: 0,
    timeInTxt: "",
    ban: false,
};
