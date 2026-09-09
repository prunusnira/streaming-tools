import { useEffect, useRef } from "react";
import type { ChatEventType } from "../../model/chatConnection";
import type { IncomingChatMessage } from "../../model/chatMessage";

const soopClientId = "5be9d42ea5924e66ae020a0427346121";
const soopSdkUrl = "https://static.sooplive.com/asset/app/chat-sdk/sooplive-chat-sdk.js";
type SoopChatSdk = {
    connect: () => Promise<unknown>;
    disconnect: () => void;
    handleMessageReceived: (
        callback: (action: string, message: Record<string, unknown>) => void,
    ) => void;
    setAuth: (accessToken: string) => void;
};
declare global {
    interface Window {
        SOOP?: { ChatSDK: new (clientId: string, clientSecret?: string) => SoopChatSdk };
    }
}

const loadSoopSdk = () =>
    new Promise<void>((resolve, reject) => {
        if (window.SOOP?.ChatSDK) return resolve();
        const script = document.createElement("script");
        script.src = soopSdkUrl;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("SOOP Chat SDK를 불러오지 못했어."));
        document.head.append(script);
    });

type UseSoopChatOptions = {
    accessToken?: string;
    events: readonly ChatEventType[];
    onError: (message?: string) => void;
    onMessage: (message: IncomingChatMessage) => Promise<void> | void;
};

export const useSoopChat = ({ accessToken, events, onError, onMessage }: UseSoopChatOptions) => {
    const onMessageRef = useRef(onMessage);
    const onErrorRef = useRef(onError);
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);
    useEffect(() => {
        onErrorRef.current = onError;
    }, [onError]);
    useEffect(() => {
        if (!accessToken || !soopClientId) return;
        let chatSdk: SoopChatSdk | undefined;
        let cancelled = false;
        const connect = async () => {
            try {
                await loadSoopSdk();
                if (cancelled || !window.SOOP?.ChatSDK) return;
                chatSdk = new window.SOOP.ChatSDK(soopClientId);
                chatSdk.setAuth(accessToken);
                chatSdk.handleMessageReceived((action, message) => {
                    if (action !== "MESSAGE" || !events.includes("chat")) return;
                    const id = typeof message.userId === "string" ? message.userId : "";
                    const name =
                        typeof message.userNickname === "string" ? message.userNickname : id;
                    const text = typeof message.message === "string" ? message.message : "";
                    if (id && text) void onMessageRef.current({ id, name, provider: "soop", text });
                });
                await chatSdk.connect();
                if (!cancelled) onErrorRef.current();
            } catch (error) {
                if (!cancelled)
                    onErrorRef.current(
                        error instanceof Error ? error.message : "SOOP 채팅 연결에 실패했어.",
                    );
            }
        };
        void connect();
        return () => {
            cancelled = true;
            if (chatSdk) {
                try {
                    chatSdk.disconnect();
                } catch {
                    // SOOP SDK는 이미 종료된 연결을 다시 해제하면 내부적으로 예외를 낼 수 있어.
                }
            }
        };
    }, [accessToken, events.join(",")]);
};
