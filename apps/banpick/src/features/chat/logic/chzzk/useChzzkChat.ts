import { useContext, useEffect, useRef } from "react";
import { createChzzkChatSession, subscribeToChzzkChat } from "@streaming-tools/auth";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { useProcessMessage } from "@banpick/features/chat/logic/irc/useProcessMessage";

type ChzzkSocketEvent = {
    content?: string;
    data?: {
        content?: string;
        profile?: { nickname?: string };
        senderChannelId?: string;
        sessionKey?: string;
    };
    profile?: { nickname?: string };
    senderChannelId?: string;
    sessionKey?: string;
    type?: string;
};

type Socket = {
    disconnect: () => void;
    on: (event: string, callback: (payload: unknown) => void) => void;
};

type SocketFactory = (
    url: string,
    options: {
        forceNew: boolean;
        reconnection: boolean;
        timeout: number;
        transports: string[];
    },
) => Socket;

const getSocketEvent = (payload: unknown): ChzzkSocketEvent | null => {
    if (typeof payload === "object" && payload !== null) return payload as ChzzkSocketEvent;
    if (typeof payload !== "string") return null;

    try {
        return JSON.parse(payload) as ChzzkSocketEvent;
    } catch {
        return null;
    }
};

const getSocketErrorMessage = (error: unknown) =>
    error instanceof Error && error.message
        ? `치지직 채팅 연결에 실패했어: ${error.message}`
        : "치지직 채팅 서버와 연결할 수 없어.";

const loadSocketIo = async (): Promise<SocketFactory> => {
    // socket.io-client 2.x는 자체 TypeScript 선언을 제공하지 않아 연결에 필요한 최소 인터페이스만 정의해.
    // @ts-expect-error socket.io-client 2.x has no bundled type declarations.
    const socketIoModule = await import("socket.io-client");
    return socketIoModule.default as SocketFactory;
};

export const useChzzkChat = () => {
    const { accounts } = useContext(StreamerContext);
    const { setConnectionError } = useContext(TalkContext);
    const { processIncomingMessage } = useProcessMessage();
    const processMessageRef = useRef(processIncomingMessage);

    useEffect(() => {
        processMessageRef.current = processIncomingMessage;
    }, [processIncomingMessage]);

    useEffect(() => {
        if (!accounts?.some((account) => account.provider === "chzzk")) return;

        let socket: Socket | undefined;
        let cancelled = false;

        const connect = async () => {
            try {
                const session = await createChzzkChatSession();
                const socketUrl = session?.socketUrl;
                if (!socketUrl || cancelled) return;

                const createSocket = await loadSocketIo();
                if (cancelled) return;
                socket = createSocket(socketUrl, {
                    forceNew: true,
                    reconnection: false,
                    timeout: 3000,
                    transports: ["websocket"],
                });
                socket.on("connect", () => setConnectionError("chzzk"));
                socket.on("connect_error", (error: unknown) => {
                    setConnectionError("chzzk", getSocketErrorMessage(error));
                });
                socket.on("connect_timeout", () => {
                    setConnectionError("chzzk", "치지직 채팅 서버 연결 시간이 초과됐어.");
                });
                socket.on("disconnect", (reason: unknown) => {
                    if (!cancelled)
                        setConnectionError(
                            "chzzk",
                            `치지직 채팅 연결이 종료됐어${
                                typeof reason === "string" ? `: ${reason}` : "."
                            }`,
                        );
                });
                socket.on("SYSTEM", (payload: unknown) => {
                    const event = getSocketEvent(payload);
                    if (!event) return;
                    const sessionKey = event.data?.sessionKey ?? event.sessionKey;
                    if (event.type === "connected" && sessionKey) {
                        void subscribeToChzzkChat(sessionKey)
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
                    const event = getSocketEvent(payload);
                    if (!event) return;
                    // CHAT 이벤트는 SYSTEM과 달리 content 등의 필드가 최상위에 있어.
                    const chat = event.content ? event : event.data;
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
    }, [accounts, setConnectionError]);
};
