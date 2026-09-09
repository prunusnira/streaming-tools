import { createElement, useCallback, useContext } from "react";
import { useChatConnections as useSharedChatConnections } from "@streaming-tools/chat";
import { AlertDialog, ModalType } from "@streaming-tools/ui";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { useProcessMessage } from "@banpick/features/chat/logic/irc/useProcessMessage";

export const useChatConnections = () => {
    const { accounts, accessTokens } = useContext(StreamerContext);
    const { setConnectionError } = useContext(TalkContext);
    const { openDialog, closeDialog } = useContext(ModalContext);
    const { processIncomingMessage } = useProcessMessage();

    const onTwitchClosed = useCallback(() => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: "알림",
            body: createElement(AlertDialog, {
                type: ModalType.TwoBtn,
                confirmLabel: "확인",
                cancelLabel: "닫기",
                message: "트위치 채팅 서버와 연결이 끊어졌습니다. 새로고침 해주세요.",
                onConfirm: closeDialog,
                onCancel: closeDialog,
            }),
            footer: undefined,
        });
    }, [closeDialog, openDialog]);

    useSharedChatConnections({
        accounts,
        accessTokens,
        onConnectionError: setConnectionError,
        onMessage: processIncomingMessage,
        onTwitchClosed,
    });
};
