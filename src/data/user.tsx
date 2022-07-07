import Message from "./message";

class User {
    private id: string;
    private name: string;
    private subs: boolean;
    private picked: boolean;
    private profileUrl: string;
    private lastChat: Message;

    constructor(id: string, name: string, subs: boolean) {
        this.id = id;
        this.name = name;
        this.subs = subs;
        this.picked = false;
        this.profileUrl = "";
        this.lastChat = new Message("", "", "");
    }

    setPicked = () => {
        this.picked = !this.picked;
    };

    setProfileUrl = (url: string) => {
        this.profileUrl = url;
    };

    updateLastMessage = (msg: Message) => {
        this.lastChat = msg;
    };

    getUserId = () => {
        return this.id;
    };
    getUserName = () => {
        return this.name;
    };
    getProfileUrl = () => {
        return this.profileUrl;
    };
    getLastMessage = () => {
        return this.lastChat;
    };
    isSubscriber = () => {
        return this.subs;
    };
    isPicked = () => {
        return this.picked;
    };
}

export default User;
