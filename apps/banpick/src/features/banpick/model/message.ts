export type Message = {
    id: string;
    name: string;
    msg: string;
    time: number;
    timeInTxt: string;
    ban: boolean;
};

export const emptyMessage: Message = {
    id: "",
    name: "",
    msg: "",
    time: 0,
    timeInTxt: "",
    ban: false,
};
