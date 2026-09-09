import { useCallback, useEffect, useRef } from "react";
import { useChzzkChat } from "./chzzk/useChzzkChat";
import { useSoopChat } from "./soop/useSoopChat";
import { useTwitchChat } from "./twitch/useTwitchChat";
import type { ChatConnectionOptions } from "../model/chatConnection";
import type { IncomingChatMessage } from "../model/chatMessage";

export const useChatConnections = (options: ChatConnectionOptions) => {
    const events = options.events ?? ["chat"];
    const onMessageRef = useRef(options.onMessage);
    const messageQueue = useRef(Promise.resolve());
    useEffect(() => {
        onMessageRef.current = options.onMessage;
    }, [options.onMessage]);
    const enqueueMessage = useCallback((message: IncomingChatMessage) => {
        messageQueue.current = messageQueue.current.then(async () => {
            try {
                await onMessageRef.current(message);
            } catch {
                // 한 메시지 처리 실패가 뒤에 대기한 메시지 처리를 막으면 안 돼.
            }
        });
        return messageQueue.current;
    }, []);
    const twitchAccount = options.accounts?.find((account) => account.provider === "twitch");
    useTwitchChat({
        accessToken: options.accessTokens.twitch,
        enabled: Boolean(twitchAccount) && events.includes("chat"),
        onClosed: options.onTwitchClosed,
        onMessage: enqueueMessage,
        userId: twitchAccount?.id,
    });
    useChzzkChat({
        enabled: Boolean(options.accounts?.some((account) => account.provider === "chzzk")),
        events,
        onError: (message) => options.onConnectionError("chzzk", message),
        onMessage: enqueueMessage,
    });
    useSoopChat({
        accessToken: options.accessTokens.soop,
        events,
        onError: (message) => options.onConnectionError("soop", message),
        onMessage: enqueueMessage,
    });
};
