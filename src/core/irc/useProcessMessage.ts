import { useContext } from "react";
import { emptyMessage, Message } from "../../data/message";
import { emptyUser } from "../../data/user";
import { ModalContext } from "../../lib/context/modalProvider";
import { StatusContext } from "../../lib/context/statusProvider";
import { StreamerContext } from "../../lib/context/streamerProvider";
import { TalkContext } from "../../lib/context/talkProvider";
import { TeamContext } from "../../lib/context/teamProvider";
import { getFormatDate } from "../../lib/tool/getFormatDate";
import { apiGetUsers } from "../api/user";
import useSpeech from "../speech/useSpeech";
import chatParser from "./chatParser";

const useProcessMessage = () => {
    const { userList, team1, team2, updateUserList, updateTeam1, updateTeam2 } =
        useContext(TeamContext);
    const { data: dataStreamer } = useContext(StreamerContext);
    const { data: dataStatus } = useContext(StatusContext);
    const { pickedUser, negoMode, addTalkHistory, closeTalkDialog, changePickedUser } =
        useContext(TalkContext);
    const { speech } = useSpeech();

    const getUser = (userid: string) => {
        return userList.filter((x) => x.userid === userid)[0];
    };

    const processMessage = async (msg: string) => {
        const msgParsed = chatParser(msg);

        if (msgParsed.size > 0) {
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

            let user = getUser(msg.id);
            // 사용자의 등록유무 확인
            if (!user || user.userid === "") {
                user = {
                    userid: msgParsed.get("userid")!,
                    displayname: msgParsed.get("display-name")!,
                    sub: isSub,
                    iconurl: "",
                    picked: false,
                    recentChat: emptyMessage,
                    team: 0,
                };
            }

            // 프로필 이미지 가져오기 (없을 때)
            if (user.iconurl === "") {
                const userRes = (await apiGetUsers(user.userid, dataStreamer.acctok)).data;

                if (userRes != null) {
                    user.iconurl = userRes.data[0]["profile_image_url"];
                }
            }

            // 해당 유저의 최종 채팅 변경
            user.recentChat = msg;

            // 팀 등록 및 이동
            if (
                dataStatus.run &&
                dataStatus.join &&
                (msg.msg.startsWith("!team ") || msg.msg.startsWith("!팀 "))
            ) {
                const teamNum = msg.msg.split(" ")[1].split("\r\n")[0];

                const useridx = userList.findIndex((x) => x.userid === msg.id);
                if (useridx > -1) {
                    // 기존 데이터를 지우고 다시 해당 사용자를 추가
                    userList[useridx].team = parseInt(teamNum);
                    updateUserList(userList);
                } else {
                    // 새 사용자를 추가
                    user.team = parseInt(teamNum);
                    userList.push(user);
                    updateUserList(userList);
                }
            }

            console.log(msg.id, " | ", pickedUser.userid);

            // 선택된 사용자의 채팅 입력 처리
            if (pickedUser.userid !== "" && pickedUser.userid === msg.id) {
                if (!negoMode && (msg.msg.startsWith("!pick ") || msg.msg.startsWith("!픽 "))) {
                    // picked user의 아이디를 기반으로 userlist에서 사용자 판별
                    // teamnum을 기반으로 해당팀의 picklist에 채팅내용을 추가 후 팀 내용 갱신
                    // 해당 사용자의 picked를 true로 변경하고 사용자 리스트 갱신
                    const index = userList.findIndex((x) => x.userid === pickedUser.userid);
                    const userinfo = userList[index];

                    const pickSplited = msg.msg.split(" ");
                    let pickMsg = "";
                    for (let i = 1; i < pickSplited.length; i++) {
                        pickMsg += pickSplited[i];
                        if (i !== pickSplited.length - 1) pickMsg += " ";
                    }

                    if (userinfo.team === 1) {
                        team1.pickList.push({
                            id: user.userid,
                            name: user.displayname,
                            msg: pickMsg,
                            time: msg.time,
                            timeInTxt: msg.timeInTxt,
                            ban: false,
                        });
                        team1.curPick++;
                        updateTeam1(team1);
                    } else if (userinfo.team === 2) {
                        team2.pickList.push({
                            id: user.userid,
                            name: user.displayname,
                            msg: pickMsg,
                            time: msg.time,
                            timeInTxt: msg.timeInTxt,
                            ban: false,
                        });
                        team2.curPick++;
                        updateTeam2(team2);
                    }

                    userList[index].picked = true;
                    updateUserList(userList);

                    // 여기는 pick을 수행하므로 이후 다이얼로그를 닫고
                    // 현재 채팅 리스트를 초기화 해주어야 함
                    // !pick을 제외하고 말하기 필요
                    speech(pickMsg);
                    changePickedUser(emptyUser);
                    closeTalkDialog();
                } else {
                    // !pick 이외의 경우
                    // 그냥 화면에 표시할 데이터 추가하고 말하기 처리
                    addTalkHistory(msg);
                    speech(msg.msg);
                }
            }
        }
    };

    return {
        processMessage,
    };
};

export default useProcessMessage;
