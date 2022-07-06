import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../data/message";
import { Observer, Subject } from "../data/observer/observer";
import Parser from "../data/parser";
import User from "../data/user";
import requestUserProfile from "../data/userProfile";
import Team from "../modules/teamlist/team";
import { RootState } from "../redux/reducer";
import useTTS from "../tts/useTTS";

const useIRC = (team1: Team, team2: Team, updateTeam: (t: Team, tn: number) => void) => {
    const [selectedUser, setSelectedUser] = useState<User>(new User("", "", false));

    const socket = useRef<WebSocket>(new WebSocket(process.env.REACT_APP_URL_IRC!));
    const subject = useRef<Subject>(new Subject(processMessage));
    const { acctok, loginName, clientId } = useSelector((state: RootState) => state.user);
    const { allPick, turnPick, turnBan, isStarted, gettingUsers, isNego } = useSelector(
        (state: RootState) => state.banpick
    );

    const { speech } = useTTS();

    useEffect(() => {
        socket.current.onopen = onSocketOpen;
        socket.current.onmessage = onMsgReceived;
        socket.current.onerror = onError;
        socket.current.onclose = onSocketClose;
    }, []);

    useEffect(() => {
        console.log(`user updated to ${selectedUser.getUserId()}`);
    }, [selectedUser]);

    const changeSelectedUser = (user: User) => {
        console.log(`change user ${user.getUserId()}`);
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

    async function processMessage(msg: string) {
        if (!isStarted) return;

        const msgParsed = Parser.parse(msg);
        const map = new Map<string, string>();

        if (msgParsed.size > 0) {
            Array.from(msgParsed.keys()).forEach((s) => {
                map.set(s, msgParsed.get(s)!);
            });

            // 뱃지 검사해서 subscriber 확인
            const badges = map.get("badges")!.split(",");
            let isSub = false;
            badges.forEach((v) => {
                if (v.startsWith("subscriber")) {
                    isSub = true;
                }
            });

            let user: User | null = null;

            const msg = new Message(map.get("userid")!, map.get("display-name")!, map.get("msg")!);

            if (team1.hasMember(msg.getUserId())) {
                user = team1.getMember(msg.getUserId());
            } else if (team2.hasMember(msg.getUserId())) {
                user = team2.getMember(msg.getUserId());
            } else {
                user = new User(map.get("userid")!, map.get("display-name")!, isSub);
            }
            user!.updateLastMessage(msg);
            if (user!.getProfileUrl() === "") {
                await requestUserProfile(user!.getUserId(), acctok, clientId, (map) => {
                    user!.setProfileUrl(map.get("profile_image_url")!);
                });
            }

            // 팀 등록
            if (
                gettingUsers &&
                (msg.getMessage().startsWith("!team ") || msg.getMessage().startsWith("!팀 "))
            ) {
                const teamNum = msg.getMessage().split(" ")[1].split("\r\n")[0];

                // 이미 다른 팀에 들어가있다면 삭제함
                if (team1.hasMember(msg.getUserId())) {
                    team1.removeMember(msg.getUserId());
                }
                if (team2.hasMember(msg.getUserId())) {
                    team2.removeMember(msg.getUserId());
                }

                if (teamNum === "1") {
                    console.log(msg.getUserId() + "가 팀 " + teamNum + "으로 등록");
                    team1.addMember(user!);
                } else if (teamNum === "2") {
                    console.log(msg.getUserId() + "가 팀 " + teamNum + "으로 등록");
                    team2.addMember(user!);
                }

                updateTeam(team1, 1);
                updateTeam(team2, 2);
            }

            console.log(`selected user`);
            console.log(selectedUser);
            // 픽 등록
            // 검사항목: 현재 유저가 선택된 유저인가
            if (selectedUser.getUserId() !== "" && msg.getUserId() === selectedUser.getUserId()) {
                if (
                    !isNego &&
                    (msg.getMessage().startsWith("!pick ") || msg.getMessage().startsWith("!픽 "))
                ) {
                    let nextPick = team1.getCurrentPick() + team2.getCurrentPick();

                    const pickSplited = msg.getMessage().split(" ");
                    let pickMsg = "";
                    for (let i = 1; i < pickSplited.length; i++) {
                        pickMsg += pickSplited[i];
                        if (i !== pickSplited.length - 1) pickMsg += " ";
                    }

                    let currentTeam = 0;

                    if (team1.hasMember(msg.getUserId())) {
                        currentTeam = 1;
                        msg.setMessage(pickMsg);

                        // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
                        team1.addToPickList(msg);

                        // 픽 한 유저는 리스트에서 더 사용할 수 없도록 처리함
                        team1.changePickable(msg.getUserId());
                        team1.addCurrentPick();
                        nextPick++;
                    }
                    if (team2.hasMember(msg.getUserId())) {
                        currentTeam = 2;
                        msg.setMessage(pickMsg);
                        team2.addToPickList(msg);
                        team2.changePickable(msg.getUserId());
                        team2.addCurrentPick();
                        nextPick++;
                    }

                    console.log(msg.getUserId() + "(팀" + currentTeam + ") MSG: " + pickMsg);
                    speech(pickMsg);

                    // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
                    let nextPhase = 1;

                    if (nextPick >= turnPick * 2) {
                        nextPhase = 2;
                        nextPick = 0;

                        // 각 팀의 현재 pick도 초기화
                        team1.resetCurrentPick();
                        team2.resetCurrentPick();
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
                    speech(msg.getMessage());
                }
            }
        }
    }
    // 해당 메시지를 Pick으로 선택하기
    const useMessage = (msg: Message) => {
        let nextPick = team1.getCurrentPick() + team2.getCurrentPick();

        let currentTeam = 0;

        if (team1.hasMember(msg.getUserId())) {
            currentTeam = 1;
            msg.setMessage(msg.getMessage());

            // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
            team1.addToPickList(msg);

            // 픽 한 유저는 리스트에서 더 사용할 수 없도록 처리함
            team1.changePickable(msg.getUserId());
            team1.addCurrentPick();
            nextPick++;
        }
        if (team2.hasMember(msg.getUserId())) {
            currentTeam = 2;
            msg.setMessage(msg.getMessage());
            team2.addToPickList(msg);
            team2.changePickable(msg.getUserId());
            team2.addCurrentPick();
            nextPick++;
        }

        console.log(msg.getUserId() + "(팀" + currentTeam + ") MSG: " + msg.getMessage());
        speech(msg.getMessage());

        // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
        // phaseChange();
        // setTotalPick(totalPick + 1);
        // setUserDlg(false);
        // setCurrentUser(new User("", "", false));
        // setCurrentChat([]);

        // 끝나고 실행해야 할 것
        // scrollToBottomPick(currentTeam);
    };

    return { registerObserver, changeSelectedUser };
};

export default useIRC;
