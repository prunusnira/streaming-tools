import { useTwitchChat } from "@banpick/features/chat/logic/twitch/useTwitchChat";
import { useChzzkChat } from "@banpick/features/chat/logic/chzzk/useChzzkChat";
import { useSoopChat } from "@banpick/features/chat/logic/soop/useSoopChat";

export const useChatConnections = () => {
    useTwitchChat();
    useChzzkChat();
    useSoopChat();
};
