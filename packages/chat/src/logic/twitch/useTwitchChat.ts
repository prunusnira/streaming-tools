import { useEffect, useRef } from "react";
import { chatParser } from "../irc/chatParser";
import { Observer, Subject } from "../irc/observer";
import type { IncomingChatMessage } from "../../model/chatMessage";

const twitchIrcUrl = "wss://irc-ws.chat.twitch.tv:443";

type UseTwitchChatOptions = {
    accessToken?: string;
    enabled: boolean;
    userId?: string;
    onMessage: (message: IncomingChatMessage) => Promise<void> | void;
    onClosed: () => void;
};

export const useTwitchChat = ({
    accessToken,
    enabled,
    userId,
    onMessage,
    onClosed,
}: UseTwitchChatOptions) => {
    const subject = useRef(new Subject());
    const observer = useRef(new Observer());
    const onMessageRef = useRef(onMessage);
    const onClosedRef = useRef(onClosed);

    useEffect(() => {
        onMessageRef.current = onMessage;
        onClosedRef.current = onClosed;
        subject.current.setFunction((rawMessage) => {
            const parsed = chatParser(rawMessage);
            if (parsed.size === 0) return;
            const badges = parsed.get("badges")?.split(",") ?? [];
            void onMessageRef.current({
                id: parsed.get("userid") ?? "",
                isSubscriber: badges.some((badge) => badge.startsWith("subscriber")),
                name: parsed.get("display-name") ?? "",
                provider: "twitch",
                text: parsed.get("msg") ?? "",
            });
        });
    }, [onMessage, onClosed]);

    useEffect(() => {
        if (!enabled || !accessToken || !userId) return;
        let intentionallyClosed = false;
        const socket = new WebSocket(twitchIrcUrl);
        socket.onopen = () => {
            socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
            socket.send(`PASS oauth:${accessToken}`);
            socket.send(`NICK ${userId}`);
            socket.send(`JOIN #${userId}`);
        };
        socket.onmessage = (event: MessageEvent<string>) => {
            if (event.data.startsWith("PING :tmi.twitch.tv")) {
                socket.send("PONG :tmi.twitch.tv");
            } else if (event.data.startsWith("@")) {
                subject.current.updateMessage(event.data);
                subject.current.notify();
            }
        };
        socket.onclose = () => {
            if (!intentionallyClosed) onClosedRef.current();
        };
        subject.current.attach(observer.current);
        return () => {
            intentionallyClosed = true;
            socket.close();
        };
    }, [accessToken, enabled, userId]);
};
