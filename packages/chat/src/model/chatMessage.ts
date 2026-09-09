import type { AuthProvider } from "@streaming-tools/auth";

export type IncomingDonation = {
    amount: number;
    unit: "cheese" | "starballoon";
};

export type IncomingChatMessage = {
    donation?: IncomingDonation;
    id: string;
    isSubscriber?: boolean;
    name: string;
    provider: AuthProvider;
    text: string;
};
