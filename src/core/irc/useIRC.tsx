import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../../lib/context/modalProvider";
import { StatusContext } from "../../lib/context/statusProvider";
import { StreamerContext } from "../../lib/context/streamerProvider";
import { TalkContext } from "../../lib/context/talkProvider";
import AlertDialog from "../../ui/dialog/alert/alertDlg";
import { Observer, Subject } from "./observer";
import useProcessMessage from "./useProcessMessage";

const useIRC = () => {
    const subject = useRef(new Subject());
    const observer = useRef(new Observer());
    const { data: dataStreamer } = useContext(StreamerContext);
    const { data: dataStatus } = useContext(StatusContext);
    const { pickedUser } = useContext(TalkContext);
    const { openDialog, closeDialog } = useContext(ModalContext);
    const socket = useRef<WebSocket>(new WebSocket(process.env.REACT_APP_URL_IRC!));
    const { processMessage } = useProcessMessage();

    useEffect(() => {
        // socket.current = new WebSocket(process.env.REACT_APP_URL_IRC!);
        socket.current.onopen = () => {
            console.log("socket open");
            // socket.send("CAP REQ :twitch.tv/tags");
            socket.current.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
            socket.current.send(`PASS oauth:${dataStreamer.acctok}`);
            socket.current.send(`NICK ${dataStreamer.userid}`);
            socket.current.send(`JOIN #${dataStreamer.userid}`);
        };

        socket.current.onmessage = (ev: MessageEvent) => {
            if (ev.data !== undefined) {
                const msg: string = ev.data;

                // 채팅 메시지 처리하기
                if (msg.startsWith("PING :tmi.twitch.tv")) {
                    socket.current.send("PONG :tmi.twitch.tv");
                    return;
                }

                if (msg.startsWith("@")) {
                    subject.current.updateMessage(msg);
                    subject.current.notify();
                }
            }
        };

        socket.current.onerror = (ev: Event) => {
            console.log("Error " + ev);
        };

        socket.current.onclose = (ev: CloseEvent) => {
            // 소켓 닫힘 알림 보내고 리로드
            openDialog({
                width: 420,
                maxWidth: 420,
                active: true,
                header: "알림",
                body: (
                    <AlertDialog
                        msg={"트위치 채팅서버와 연결이 끊어졌습니다. 새로고침 해주세요."}
                        closeDialog={closeDialog}
                    />
                ),
                footer: undefined,
            });
        };

        registerObserver(observer.current);
    }, []);

    useEffect(() => {
        // 상태가 변경되면 subject도 같이 변경되어야 함
        subject.current.setFunction(processMessage);
    }, [dataStatus, pickedUser]);

    const registerObserver = (observer: Observer) => {
        subject.current.attach(observer);
    };

    return { registerObserver };
};

export default useIRC;
