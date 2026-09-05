import { useContext, useEffect, useRef } from "react";
// socket.io-client 2.x는 자체 TypeScript 선언을 제공하지 않아 연결에 필요한 최소 인터페이스만 정의해.
// @ts-expect-error socket.io-client 2.x has no bundled type declarations.
import io from "socket.io-client";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { useProcessMessage } from "@banpick/features/chat/logic/irc/useProcessMessage";

const sessionAuthUrl = "https://api.chzzk.naver.com/open/v1/sessions/auth";
const chatSubscriptionUrl = "https://api.chzzk.naver.com/open/v1/sessions/events/subscribe/chat";

type ChzzkSessionResponse = {
    content?: { url?: string };
};

type ChzzkSocketEvent = {
    data?: {
        content?: string;
        profile?: { nickname?: string };
        senderChannelId?: string;
        sessionKey?: string;
    };
    sessionKey?: string;
    type?: string;
};

type Socket = {
    disconnect: () => void;
    on: (event: string, callback: (payload: unknown) => void) => void;
};

const subscribeChat = async (accessToken: string, sessionKey: string) => {
    const response = await fetch(chatSubscriptionUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionKey }),
    });

    if (!response.ok) {
        throw new Error(`치지직 채팅 구독에 실패했어. (HTTP ${response.status})`);
    }
};

export const useChzzkChat = () => {
    const { accessTokens } = useContext(StreamerContext);
    const { setConnectionError } = useContext(TalkContext);
    const { processIncomingMessage } = useProcessMessage();
    const processMessageRef = useRef(processIncomingMessage);

    useEffect(() => {
        processMessageRef.current = processIncomingMessage;
    }, [processIncomingMessage]);

    useEffect(() => {
        const accessToken = accessTokens.chzzk;
        if (!accessToken) return;

        let socket: Socket | undefined;
        let cancelled = false;

        const connect = async () => {
            try {
                const response = await fetch(sessionAuthUrl, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (!response.ok) {
                    throw new Error(`치지직 채팅 세션 생성에 실패했어. (HTTP ${response.status})`);
                }

                const payload = (await response.json()) as ChzzkSessionResponse;
                const socketUrl = payload.content?.url;
                if (!socketUrl || cancelled) return;

                socket = io(socketUrl, { transports: ["websocket"] }) as Socket;
                socket.on("SYSTEM", (payload: unknown) => {
                    const event = payload as ChzzkSocketEvent;
                    const sessionKey = event.data?.sessionKey ?? event.sessionKey;
                    if (event.type === "connected" && sessionKey) {
                        void subscribeChat(accessToken, sessionKey)
                            .then(() => setConnectionError("chzzk"))
                            .catch((error: unknown) => {
                                const message =
                                    error instanceof Error
                                        ? error.message
                                        : "치지직 채팅 구독에 실패했어.";
                                setConnectionError("chzzk", message);
                            });
                    }
                });
                socket.on("CHAT", (payload: unknown) => {
                    const event = payload as ChzzkSocketEvent;
                    const chat = event.data;
                    if (!chat?.content || !chat.senderChannelId) return;
                    void processMessageRef.current({
                        id: chat.senderChannelId,
                        name: chat.profile?.nickname ?? chat.senderChannelId,
                        provider: "chzzk",
                        text: chat.content,
                    });
                });
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "치지직 채팅 연결에 실패했어.";
                setConnectionError("chzzk", message);
            }
        };

        void connect();
        return () => {
            cancelled = true;
            socket?.disconnect();
        };
    }, [accessTokens.chzzk, setConnectionError]);
};
