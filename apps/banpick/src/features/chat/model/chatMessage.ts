import type { AuthProvider } from "@streaming-tools/auth";

export type IncomingChatMessage = {
    id: string;
    name: string;
    provider: AuthProvider;
    text: string;
};
