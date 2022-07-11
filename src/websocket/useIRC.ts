import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Message, { emptyMessage } from "../data/message";
import { Observer, Subject } from "../data/observer/observer";
import Parser from "../data/parser";
import User, { emptyUser } from "../data/user";
import requestUserProfile from "../data/userProfile";
import { IBanpickData } from "../modules/main/useBanpickData";
import Team from "../data/team";
import { RootState } from "../redux/reducer";
import useTTS from "../tts/useTTS";

type Props = {
    banpickData: IBanpickData;
    team1: Team;
    team2: Team;
    setTeam1: (t: Team) => void;
    setTeam2: (t: Team) => void;
    addMember: (teamNum: number, user: User) => void;
    getMember: (teamNum: number, id: string) => User;
    hasMember: (teamNum: number, userId: string) => boolean;
    removeMember: (teamNum: number, id: string) => void;
    addPick: (teamNum: number, msg: Message) => void;
    getNextPick: () => number;
    resetPick: () => void;
};

const useIRC = ({
    banpickData,
    team1,
    team2,
    setTeam1,
    setTeam2,
}: // addMember,
// getMember,
// hasMember,
// removeMember,
// addPick,
// getNextPick,
// resetPick,
Props) => {
    const [selectedUser, setSelectedUser] = useState<User>(emptyUser);

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
        console.log(`re render check ${isStarted}`);

        subject.current.setFunction(processMessage);
    }, [isStarted]);

    useEffect(() => {
        console.log(`user updated to ${selectedUser.id}`);
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
                time: "",
            };

            console.log("// speech test");
            speech(msg.msg);

            if (team1.members.filter((x) => (x.id = msg.id)).length > 0) {
                user = team1.members.filter((x) => (x.id = msg.id))[0];
            } else if (team2.members.filter((x) => (x.id = msg.id)).length > 0) {
                user = team2.members.filter((x) => (x.id = msg.id))[0];

                // if (hasMember(1, msg.id)) {
                //     user = getMember(1, msg.id);
                // } else if (hasMember(2, msg.id)) {
                //     user = getMember(2, msg.id);
            } else {
                user = {
                    id: msgParsed.get("userid")!,
                    name: msgParsed.get("display-name")!,
                    subs: isSub,
                    profileUrl: "",
                    picked: false,
                    lastChat: msg,
                };
            }
            if (user.profileUrl === "") {
                await requestUserProfile(user!.id, acctok, clientId, (map) => {
                    user.profileUrl = map.get("profile_image_url")!;
                });
            }

            // 팀 등록
            if (isEntering && (msg.msg.startsWith("!team ") || msg.msg.startsWith("!팀 "))) {
                const teamNum = msg.msg.split(" ")[1].split("\r\n")[0];

                // 이미 다른 팀에 들어가있다면 삭제함
                console.log(msg.id);
                console.log(team1.members.filter((x) => (x.id = msg.id)).length > 0);
                console.log(team2.members.filter((x) => (x.id = msg.id)).length > 0);
                // console.log(hasMember(1, msg.id));
                // console.log(hasMember(2, msg.id));
                // if (hasMember(1, msg.id)) {
                if (team1.members.filter((x) => (x.id = msg.id)).length > 0) {
                    console.log("중복 삭제 1");
                    // removeMember(1, msg.id);
                    let num = -1;
                    for (let i = 0; i < team1.members.length; i++) {
                        if (team1.members[i].id === msg.id) {
                            num = i;
                        }
                    }
                    if (num !== -1) team1.members.splice(num, 1);
                }
                // if (hasMember(2, msg.id)) {
                if (team2.members.filter((x) => (x.id = msg.id)).length > 0) {
                    console.log("중복 삭제 2");
                    // removeMember(2, msg.id);
                    let num = -1;
                    for (let i = 0; i < team2.members.length; i++) {
                        if (team2.members[i].id === msg.id) {
                            num = i;
                        }
                    }
                    if (num !== -1) team2.members.splice(num, 1);
                }

                if (teamNum === "1") {
                    console.log(msg.id + "가 팀 " + teamNum + "으로 등록");
                    team1.members.push(user);
                } else if (teamNum === "2") {
                    console.log(msg.id + "가 팀 " + teamNum + "으로 등록");
                    team2.members.push(user);
                }

                const updateTeam1 = {
                    ...team1,
                    members: [...team1.members],
                    pickList: [...team1.pickList],
                };
                const updateTeam2 = {
                    ...team2,
                    members: [...team2.members],
                    pickList: [...team2.pickList],
                };
                setTeam1(updateTeam1);
                setTeam2(updateTeam2);
            }

            console.log(`selected user ${selectedUser.id}`);
            // 픽 등록
            // 검사항목: 현재 유저가 선택된 유저인가
            if (selectedUser.id !== "" && msg.id === selectedUser.id) {
                if (!isNegoMode && (msg.msg.startsWith("!pick ") || msg.msg.startsWith("!픽 "))) {
                    let nextPick = team1.cpick + team2.cpick;

                    const pickSplited = msg.msg.split(" ");
                    let pickMsg = "";
                    for (let i = 1; i < pickSplited.length; i++) {
                        pickMsg += pickSplited[i];
                        if (i !== pickSplited.length - 1) pickMsg += " ";
                    }

                    let currentTeam = 0;

                    if (team1.members.filter((x) => (x.id = msg.id)).length > 0) {
                        currentTeam = 1;
                        msg.msg = pickMsg;

                        // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
                        // addPick(1, msg);
                        team1.pickList.push(msg);

                        // 픽 한 유저는 리스트에서 더 사용할 수 없도록 처리함
                        // getMember(1, msg.id).picked = true;
                        team1.members.filter((x) => x.id === msg.id)[0].picked = true;
                        nextPick++;
                    }
                    if (team2.members.filter((x) => (x.id = msg.id)).length > 0) {
                        currentTeam = 2;
                        msg.msg = pickMsg;
                        // addPick(2, msg);
                        team2.pickList.push(msg);
                        // getMember(2, msg.id).picked = true;
                        team2.members.filter((x) => x.id === msg.id)[0].picked = true;
                        nextPick++;
                    }

                    console.log(msg.id + "(팀" + currentTeam + ") MSG: " + pickMsg);
                    speech(pickMsg);

                    // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
                    let nextPhase = 1;

                    if (nextPick >= turnPick * 2) {
                        nextPhase = 2;
                        nextPick = 0;

                        // 각 팀의 현재 pick도 초기화
                        // resetPick();
                        setTeam1({ ...team1, cpick: 0 });
                        setTeam2({ ...team2, cpick: 0 });
                    }

                    // setUserDlg(false);
                    // setCurrentUser(new User("", "", false));
                    // setCurrentChat(new Array<Message>());
                    // setPhase(nextPhase);
                    // setTotalPick(totalPick + 1);

                    // state 변경 이후 실행되어야 함
                    // scrollToBottomPick(currentTeam);
                } else {
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
