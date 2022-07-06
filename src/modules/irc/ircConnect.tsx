import { Observer, Subject } from "../../data/observer/observer";

class IRCConnect {
    socket: WebSocket;
    acctok: string;
    loginName: string;
    subject: Subject | null = null;

    constructor(acctok: string, loginName: string, updateFunction: (msg: string) => void) {
        this.socket = new WebSocket(process.env.REACT_APP_URL_IRC!);
        this.socket.onopen = this.onSocketOpen.bind(this);
        this.socket.onmessage = this.onMsgReceived.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onclose = this.onSocketClosed.bind(this);
        this.connect = this.connect.bind(this);

        this.acctok = acctok;
        this.loginName = loginName;
        this.subject = new Subject(updateFunction);
    }

    onMsgReceived = (ev: MessageEvent) => {
        if (ev.data !== undefined) {
            const msg: string = ev.data;

            // 채팅 메시지 처리하기
            if (msg.startsWith("PING :tmi.twitch.tv")) {
                this.socket.send("PONG :tmi.twitch.tv");
                return;
            }

            if (msg.startsWith("@")) {
                this.subject?.updateMessage(msg);
                this.subject?.notify();
            }
        }
    };

    onSocketOpen = (ev: Event) => {
        console.log("IRC Connected " + ev.returnValue);
        this.connect();
    };

    onError = (ev: Event) => {
        console.log("Error " + ev.returnValue);
    };

    onSocketClosed = (ev: CloseEvent) => {
        console.log("WS Closed: " + ev.code);
    };

    registerObserver = (observer: Observer) => {
        this.subject?.attach(observer);
    };

    connect = () => {
        console.log("Connected to chat");

        this.socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
        this.socket.send("PASS oauth:" + this.acctok);
        this.socket.send("NICK " + this.loginName.toLowerCase());
        this.socket.send("JOIN #" + this.loginName.toLowerCase());
    };
}

export default IRCConnect;
