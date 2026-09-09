import type { AuthAccount, AuthProvider } from "@streaming-tools/auth";
import type { IncomingChatMessage } from "./chatMessage";

export type ChatEventType = "chat" | "donation";

export type ChatConnectionOptions = {
    accounts: AuthAccount[] | undefined;
    accessTokens: Partial<Record<AuthProvider, string>>;
    events?: readonly ChatEventType[];
    onMessage: (message: IncomingChatMessage) => Promise<void> | void;
    onConnectionError: (provider: AuthProvider, message?: string) => void;
    onTwitchClosed: () => void;
};
