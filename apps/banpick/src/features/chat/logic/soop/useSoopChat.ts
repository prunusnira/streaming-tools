import { useContext, useEffect, useRef } from "react";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { useProcessMessage } from "@banpick/features/chat/logic/irc/useProcessMessage";

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
        SOOP?: {
            ChatSDK: new (clientId: string, clientSecret?: string) => SoopChatSdk;
        };
    }
}

const loadSoopSdk = () =>
    new Promise<void>((resolve, reject) => {
        if (window.SOOP?.ChatSDK) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = soopSdkUrl;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("SOOP Chat SDK를 불러오지 못했어."));
        document.head.append(script);
    });

export const useSoopChat = () => {
    const { accessTokens } = useContext(StreamerContext);
    const { setConnectionError } = useContext(TalkContext);
    const { processIncomingMessage } = useProcessMessage();
    const processMessageRef = useRef(processIncomingMessage);

    useEffect(() => {
        processMessageRef.current = processIncomingMessage;
    }, [processIncomingMessage]);

    useEffect(() => {
        const accessToken = accessTokens.soop;
        // 심사 전에는 Client ID가 비어 있으므로 SDK 연결을 시도하지 않아.
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
                    if (action !== "MESSAGE") return;
                    const id = typeof message.userId === "string" ? message.userId : "";
                    const name =
                        typeof message.userNickname === "string" ? message.userNickname : id;
                    const text = typeof message.message === "string" ? message.message : "";
                    if (!id || !text) return;

                    void processMessageRef.current({ id, name, provider: "soop", text });
                });
                await chatSdk.connect();
                setConnectionError("soop");
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "SOOP 채팅 연결에 실패했어.";
                setConnectionError("soop", message);
            }
        };

        void connect();
        return () => {
            cancelled = true;
            chatSdk?.disconnect();
        };
    }, [accessTokens.soop, setConnectionError]);
};
