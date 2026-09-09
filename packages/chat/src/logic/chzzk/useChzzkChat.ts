import { useEffect, useRef } from "react";
import { createChzzkChatSession, subscribeToChzzkEvent } from "@streaming-tools/auth";
import type { ChatEventType } from "../../model/chatConnection";
import type { IncomingChatMessage } from "../../model/chatMessage";

type ChzzkEventData = {
    content?: string;
    donationText?: string;
    donatorChannelId?: string;
    donatorNickname?: string;
    payAmount?: string | number;
    profile?: { nickname?: string };
    senderChannelId?: string;
    sessionKey?: string;
};
type ChzzkSocketEvent = ChzzkEventData & {
    data?: ChzzkEventData;
    type?: string;
};
type Socket = {
    disconnect: () => void;
    on: (event: string, callback: (payload: unknown) => void) => void;
};
type SocketFactory = (
    url: string,
    options: { forceNew: boolean; reconnection: boolean; timeout: number; transports: string[] },
) => Socket;

const getEvent = (payload: unknown): ChzzkSocketEvent | null => {
    if (typeof payload === "object" && payload !== null) return payload as ChzzkSocketEvent;
    if (typeof payload !== "string") return null;
    try {
        return JSON.parse(payload) as ChzzkSocketEvent;
    } catch {
        return null;
    }
};

const getPositiveNumber = (value: unknown) => {
    const amount = typeof value === "number" ? value : Number(value);
    return Number.isFinite(amount) && amount > 0 ? amount : undefined;
};

const loadSocketIo = async (): Promise<SocketFactory> => {
    // @ts-expect-error socket.io-client 2.x has no bundled type declarations.
    const socketIoModule = await import("socket.io-client");
    return socketIoModule.default as SocketFactory;
};

type UseChzzkChatOptions = {
    enabled: boolean;
    events: readonly ChatEventType[];
    onError: (message?: string) => void;
    onMessage: (message: IncomingChatMessage) => Promise<void> | void;
};

export const useChzzkChat = ({ enabled, events, onError, onMessage }: UseChzzkChatOptions) => {
    const onMessageRef = useRef(onMessage);
    const onErrorRef = useRef(onError);
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);
    useEffect(() => {
        onErrorRef.current = onError;
    }, [onError]);
    useEffect(() => {
        if (!enabled || !events.length) return;
        let socket: Socket | undefined;
        let cancelled = false;
        const connect = async () => {
            try {
                const session = await createChzzkChatSession();
                if (!session?.socketUrl || cancelled) return;
                const createSocket = await loadSocketIo();
                if (cancelled) return;
                socket = createSocket(session.socketUrl, {
                    forceNew: true,
                    reconnection: false,
                    timeout: 3000,
                    transports: ["websocket"],
                });
                socket.on("connect", () => onErrorRef.current());
                socket.on("connect_error", (error) =>
                    onErrorRef.current(
                        error instanceof Error
                            ? `치지직 채팅 연결에 실패했어: ${error.message}`
                            : "치지직 채팅 서버와 연결할 수 없어.",
                    ),
                );
                socket.on("connect_timeout", () =>
                    onErrorRef.current("치지직 채팅 서버 연결 시간이 초과됐어."),
                );
                socket.on("disconnect", (reason) => {
                    if (!cancelled)
                        onErrorRef.current(
                            `치지직 채팅 연결이 종료됐어${typeof reason === "string" ? `: ${reason}` : "."}`,
                        );
                });
                const receiveChat = (payload: unknown) => {
                    const event = getEvent(payload);
                    const chat = event?.content ? event : event?.data;
                    if (!chat?.senderChannelId) return;
                    void onMessageRef.current({
                        id: chat.senderChannelId,
                        name: chat.profile?.nickname ?? chat.senderChannelId,
                        provider: "chzzk",
                        text: chat.content ?? "",
                    });
                };
                const receiveDonation = (payload: unknown) => {
                    const event = getEvent(payload);
                    const donation = event?.data ?? event;
                    const amount = getPositiveNumber(donation?.payAmount);
                    if (!donation?.donatorChannelId || !amount) return;
                    void onMessageRef.current({
                        donation: { amount, unit: "cheese" },
                        id: donation.donatorChannelId,
                        name: donation.donatorNickname ?? donation.donatorChannelId,
                        provider: "chzzk",
                        text: donation.donationText ?? "",
                    });
                };
                socket.on("SYSTEM", (payload) => {
                    const event = getEvent(payload);
                    const sessionKey = event?.data?.sessionKey ?? event?.sessionKey;
                    if (event?.type === "connected" && sessionKey) {
                        void Promise.all(
                            events.map((eventType) => subscribeToChzzkEvent(sessionKey, eventType)),
                        )
                            .then(() => onErrorRef.current())
                            .catch((error: unknown) =>
                                onErrorRef.current(
                                    error instanceof Error
                                        ? error.message
                                        : "치지직 이벤트 구독에 실패했어.",
                                ),
                            );
                    }
                    if (events.includes("donation") && event?.type?.toUpperCase() === "DONATION")
                        receiveDonation(payload);
                });
                if (events.includes("chat")) socket.on("CHAT", receiveChat);
            } catch (error) {
                if (!cancelled)
                    onErrorRef.current(
                        error instanceof Error ? error.message : "치지직 채팅 연결에 실패했어.",
                    );
            }
        };
        void connect();
        return () => {
            cancelled = true;
            socket?.disconnect();
        };
    }, [enabled, events.join(",")]);
};
