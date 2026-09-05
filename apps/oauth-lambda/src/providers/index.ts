import { chzzkProvider } from "./chzzk.js";
import { soopProvider } from "./soop.js";
import { twitchProvider } from "./twitch.js";
import type { OAuthProvider } from "./types.js";

const providers = new Map<string, OAuthProvider>([
    [twitchProvider.id, twitchProvider],
    [chzzkProvider.id, chzzkProvider],
    [soopProvider.id, soopProvider],
]);

export const getProvider = (providerId: string) => providers.get(providerId);
