import type { IncomingChatMessage } from "@streaming-tools/chat";

export type CollectionMode = "all" | "prefix";
export type ParticipantFilter = "all" | "selected" | "unselected";

export type ChatEntry = IncomingChatMessage & {
    receivedAt: number;
};

export type Participant = {
    hasBeenSelected: boolean;
    isIncluded: boolean;
    key: string;
    latestChat?: ChatEntry;
    name: string;
};

export const getParticipantKey = (message: IncomingChatMessage) =>
    `${message.provider}:${message.id}`;

export const isEligibleMessage = (
    message: IncomingChatMessage,
    mode: CollectionMode,
    prefix: string,
) => mode === "all" || message.text.startsWith(prefix);
