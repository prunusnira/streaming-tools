import Message from "./message";

type User = {
    id: string;
    name: string;
    subs: boolean;
    picked: boolean;
    profileUrl: string;
    lastChat: Message;
};

export const emptyUser: User = {
    id: "",
    name: "",
    subs: false,
    picked: false,
    profileUrl: "",
    lastChat: {
        id: "",
        name: "",
        msg: "",
        time: 0,
        timeInTxt: "",
        ban: false,
    },
};

export default User;
