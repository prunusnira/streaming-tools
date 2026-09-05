import { useContext, useEffect, useRef } from "react";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { StatusContext } from "@banpick/features/banpick/model/StatusProvider";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { AlertDialog } from "@streaming-tools/ui";
import { twitchIrcUrl } from "@banpick/shared/constants/twitch";
import { Observer, Subject } from "./observer";
import { useProcessMessage } from "./useProcessMessage";

export const useIRC = () => {
    const subject = useRef(new Subject());
    const observer = useRef(new Observer());
    const { data: dataStreamer } = useContext(StreamerContext);
    const { data: dataStatus } = useContext(StatusContext);
    const { pickedUser } = useContext(TalkContext);
    const { openDialog, closeDialog } = useContext(ModalContext);
    const socket = useRef<WebSocket | null>(null);
    const intentionallyClosed = useRef(false);
    const { processMessage } = useProcessMessage();

    useEffect(() => {
        // access token은 HttpOnly 쿠키로 보관하므로 브라우저 IRC 연결에 직접 전달하지 않아.
        // Lambda IRC 중계가 준비되기 전까지는 토큰을 노출하지 않고 연결을 생략해.
        if (dataStreamer.provider !== "twitch" || dataStreamer.acctok === "") return;
        intentionallyClosed.current = false;
        socket.current = new WebSocket(twitchIrcUrl);
        const currentSocket = socket.current;
        currentSocket.onopen = () => {
            console.log("socket open");
            // socket.send("CAP REQ :twitch.tv/tags");
            currentSocket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
            currentSocket.send(`PASS oauth:${dataStreamer.acctok}`);
            currentSocket.send(`NICK ${dataStreamer.userid}`);
            currentSocket.send(`JOIN #${dataStreamer.userid}`);
        };

        currentSocket.onmessage = (ev: MessageEvent) => {
            if (ev.data !== undefined) {
                const msg: string = ev.data;

                // 채팅 메시지 처리하기
                if (msg.startsWith("PING :tmi.twitch.tv")) {
                    currentSocket.send("PONG :tmi.twitch.tv");
                    return;
                }

                if (msg.startsWith("@")) {
                    subject.current.updateMessage(msg);
                    subject.current.notify();
                }
            }
        };

        currentSocket.onerror = (ev: Event) => {
            console.log("Error " + ev);
        };

        currentSocket.onclose = (ev: CloseEvent) => {
            if (intentionallyClosed.current) return;
            // 소켓 닫힘 알림 보내고 리로드
            openDialog({
                width: 420,
                maxWidth: 420,
                active: true,
                header: "알림",
                body: (
                    <AlertDialog
                        cancelLabel={"확인"}
                        message={"트위치 채팅서버와 연결이 끊어졌습니다. 새로고침 해주세요."}
                        onCancel={closeDialog}
                    />
                ),
                footer: undefined,
            });
        };

        registerObserver(observer.current);
        return () => {
            intentionallyClosed.current = true;
            currentSocket.close();
        };
    }, [dataStreamer.acctok, dataStreamer.provider, dataStreamer.userid]);

    useEffect(() => {
        // 상태가 변경되면 subject도 같이 변경되어야 함
        subject.current.setFunction(processMessage);
    }, [dataStatus, pickedUser]);

    const registerObserver = (observer: Observer) => {
        subject.current.attach(observer);
    };

    return { registerObserver };
};
