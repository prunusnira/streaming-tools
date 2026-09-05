import { useIRC } from "@banpick/features/chat/logic/irc/useIRC";
import { useChzzkChat } from "@banpick/features/chat/logic/chzzk/useChzzkChat";
import { useSoopChat } from "@banpick/features/chat/logic/soop/useSoopChat";

export const useChatConnections = () => {
    useIRC();
    useChzzkChat();
    useSoopChat();
};
