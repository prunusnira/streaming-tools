import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Message, { emptyMessage, getFormatDate } from "../data/message";
import { Observer, Subject } from "../data/observer/observer";
import Parser from "../data/parser";
import User, { emptyUser } from "../data/user";
import requestUserProfile from "../data/userProfile";
import { IBanpickData } from "../modules/main/useBanpickData";
import Team from "../data/team";
import { RootState } from "../redux/reducer";
import useTTS from "../tts/useTTS";
import useStorage from "../db/useStorage";

type Props = {
    banpickData: IBanpickData;
    hasUser: (teamNum: number, user: User) => Promise<boolean>;
    hasUserById: (teamNum: number, id: string) => Promise<boolean>;
    getUserById: (teamNum: number, id: string) => Promise<User>;
    removeUser: (teamNum: number, user: User) => Promise<void>;
    addUser: (teamNum: number, user: User) => Promise<void>;
    getTeamInfo: (teamNum: number) => Promise<Team>;

    selectedUser: User | null;
    setSelectedUser: (u: User) => void;
    selectedChatLog: Array<Message>;
    setChatLog: (l: Array<Message>) => void;
};

const useIRC = ({
    banpickData,
    hasUser,
    hasUserById,
    getUserById,
    removeUser,
    addUser,
    getTeamInfo,

    selectedUser,
    setSelectedUser,
    selectedChatLog,
    setChatLog,
}: Props) => {
    const socket = useRef<WebSocket>(new WebSocket(process.env.REACT_APP_URL_IRC!));
    const subject = useRef<Subject>(new Subject());
    const { acctok, loginName, clientId } = useSelector((state: RootState) => state.user);
    const { allPick, turnPick, turnBan, isStarted, isEntering, isNegoMode, phase } = banpickData;

    const { speech } = useTTS();

    useEffect(() => {
        socket.current.onopen = onSocketOpen;
        socket.current.onmessage = onMsgReceived;
        socket.current.onerror = onError;
        socket.current.onclose = onSocketClose;

        // subject.current.setFunction(processMessage);
    }, []);

    useEffect(() => {
        subject.current.setFunction(processMessage);
    }, [isStarted]);

    useEffect(() => {
        console.log(`user updated to ${selectedUser?.id}`);
    }, [selectedUser]);

    const changeSelectedUser = (user: User) => {
        console.log(`change user ${user.id}`);
        setSelectedUser(user);
    };

    const onSocketOpen = (ev: Event) => {
        console.log("IRC Connected " + ev.returnValue);
        connect();
    };

    const connect = () => {
        console.log("Connected to chat");

        socket.current.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership");
        socket.current.send("PASS oauth:" + acctok);
        socket.current.send("NICK " + loginName.toLowerCase());
        socket.current.send("JOIN #" + loginName.toLowerCase());
    };

    const onMsgReceived = (ev: MessageEvent) => {
        console.log(`messge get ${ev.data}`);
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

    const onError = (ev: Event) => {
        console.log("Error " + ev.returnValue);
    };

    const onSocketClose = (ev: CloseEvent) => {
        console.log("WS Closed: " + ev.code);
    };

    const registerObserver = (observer: Observer) => {
        subject.current.attach(observer);
    };

    const processMessage = async (msg: string) => {
        console.log(`process message ${isStarted}`);
        if (!isStarted) return;

        const msgParsed = Parser.parse(msg);
        console.log("// parsed message");
        console.log(msgParsed);

        if (msgParsed.size > 0) {
            // 메시지와 사용자 판별
            let user = emptyUser;

            // 뱃지 검사해서 subscriber 확인
            const badges = msgParsed.get("badges")!.split(",");
            let isSub = false;
            badges.forEach((v) => {
                if (v.startsWith("subscriber")) {
                    isSub = true;
                }
            });

            const msg: Message = {
                id: msgParsed.get("userid")!,
                name: msgParsed.get("display-name")!,
                msg: msgParsed.get("msg")!,
                ban: false,
                time: Date.now(),
                timeInTxt: getFormatDate(Date.now()),
            };

            console.log(msg);

            // 소속 팀 유무 확인
            if (await hasUserById(1, msg.id)) {
                user = await getUserById(1, msg.id);
            } else if (await hasUserById(2, msg.id)) {
                user = await getUserById(2, msg.id);
            } else {
                user = {
                    id: msgParsed.get("userid")!,
                    name: msgParsed.get("display-name")!,
                    subs: isSub,
                    profileUrl: "",
                    picked: false,
                    lastChat: emptyMessage,
                };
            }

            // 프로필 이미지 가져오기 (없을 때)
            if (user.profileUrl === "") {
                await requestUserProfile(user!.id, acctok, clientId, (map) => {
                    user.profileUrl = map.get("profile_image_url")!;
                });
            }

            // 해당 유저의 최종 채팅 변경
            user.lastChat = msg;

            // 팀 등록
            if (isEntering && (msg.msg.startsWith("!team ") || msg.msg.startsWith("!팀 "))) {
                const teamNum = msg.msg.split(" ")[1].split("\r\n")[0];

                // 이미 다른 팀에 들어가있다면 삭제함
                teamNum === "1" && removeUser(2, user);
                teamNum === "2" && removeUser(1, user);

                if (teamNum === "1") {
                    console.log(msg.id + "가 팀 " + teamNum + "으로 등록");
                    addUser(1, user);
                } else if (teamNum === "2") {
                    console.log(msg.id + "가 팀 " + teamNum + "으로 등록");
                    addUser(2, user);
                }
            }

            // 픽 등록
            // 검사항목: 현재 유저가 선택된 유저인가
            if (selectedUser?.id !== "" && msg.id === selectedUser?.id) {
                if (!isNegoMode && (msg.msg.startsWith("!pick ") || msg.msg.startsWith("!픽 "))) {
                    const team1 = await getTeamInfo(1);
                    const team2 = await getTeamInfo(2);
                    let nextPick = (team1 ? team1.cpick : 0) + (team2 ? team2.cpick : 0);

                    const pickSplited = msg.msg.split(" ");
                    let pickMsg = "";
                    for (let i = 1; i < pickSplited.length; i++) {
                        pickMsg += pickSplited[i];
                        if (i !== pickSplited.length - 1) pickMsg += " ";
                    }
                    msg.msg = pickMsg;
                    nextPick++;

                    user.picked = true;

                    if (await hasUser(1, user)) {
                        const team = await getTeamInfo(1);
                        team && team.pickList.push(msg);
                    }
                    if (await hasUser(2, user)) {
                        const team = await getTeamInfo(2);
                        team && team.pickList.push(msg);
                    }

                    speech(pickMsg);

                    // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
                    let nextPhase = 1;

                    if (nextPick >= turnPick * 2) {
                        nextPhase = 2;
                        nextPick = 0;

                        // 각 팀의 현재 pick도 초기화
                        // resetPick();
                        // setTeam1({ ...team1, cpick: 0 });
                        // setTeam2({ ...team2, cpick: 0 });
                    }

                    // setUserDlg(false);
                    // setCurrentUser(new User("", "", false));
                    // setCurrentChat(new Array<Message>());
                    // setPhase(nextPhase);
                    // setTotalPick(totalPick + 1);

                    // state 변경 이후 실행되어야 함
                    // scrollToBottomPick(currentTeam);
                } else {
                    console.log("// display");
                    console.log(msg);
                    // 메시지 받아서 디스플레이 되도록 추가
                    // currentChat.push(msg);
                    // setCurrentChat(currentChat);
                    // scrollToBottomChat();
                    speech(msg.msg);
                }
            }
        }
    };

    // 해당 메시지를 Pick으로 선택하기
    // const useMessage = (msg: Message) => {
    //     let nextPick = getNextPick();

    //     let currentTeam = 0;

    //     if (hasMember(1, msg.id)) {
    //         currentTeam = 1;

    //         // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
    //         addPick(1, msg);

    //         // 픽 한 유저는 리스트에서 더 사용할 수 없도록 처리함
    //         getMember(1, msg.id).picked = true;
    //         nextPick++;
    //     }
    //     if (hasMember(2, msg.id)) {
    //         currentTeam = 2;
    //         addPick(2, msg);
    //         getMember(2, msg.id).picked = true;
    //         nextPick++;
    //     }

    //     console.log(msg.id + "(팀" + currentTeam + ") MSG: " + msg.msg);
    //     speech(msg.msg);

    //     // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
    //     // phaseChange();
    //     // setTotalPick(totalPick + 1);
    //     // setUserDlg(false);
    //     // setCurrentUser(new User("", "", false));
    //     // setCurrentChat([]);

    //     // 끝나고 실행해야 할 것
    //     // scrollToBottomPick(currentTeam);
    // };

    return { registerObserver, changeSelectedUser };
};

export default useIRC;
