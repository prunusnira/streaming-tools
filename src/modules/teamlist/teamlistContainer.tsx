import React, { useState } from "react";
import Message from "../../data/message";
import User from "../../data/user";
import UserDialog from "../dialog/userDialog/userdlg";
import useUserDlg from "../dialog/userDialog/useUserDlg";
import Team from "./team";
import TeamList from "./teamlist";
import "./teamlist.css";
import useTeamList from "./useTeamList";
import useUserPick from "./useUserPick";

interface Props {
    team: Team;
    teamListDisplay: boolean;
    updateTeam: (team: Team, teamNum: number) => void;
}

const TeamListContainer = ({ team, teamListDisplay, updateTeam }: Props) => {
    const [dlgTeamName, setDlgTeamName] = useState(false);

    const { teamList, runRoulette, changeTeamName, changeUserStatePicked } = useTeamList({
        team,
        updateTeam,
    });

    const { pickedUser, setPickedUser, chatLog, setChatLog } = useUserPick();
    const { display, isNego, setNego, skip, close } = useUserDlg();

    // 유저 강제 소환
    const summonUser = (user: User) => {
        // 다이얼로그 열기
    };

    // const selectUser = () => {
    //     let arr = new Array<User>();
    //     let partPickOver = false;

    //     if (props.phase === 2) {
    //         setRouletteDlg(true);
    //         setMsg("밴 페이즈가 진행중입니다. 밴을 수행하거나 강제 페이즈 변경을 해주세요");
    //         return;
    //     }

    //     if (props.totalPickCount >= props.pickCount * 2) {
    //         setRouletteDlg(true);
    //         setMsg("전체 픽 페이즈가 종료되었습니다. 결과를 확인해주세요.");
    //     } else {
    //         if (props.team.getCurrentPick() >= props.banInterval) {
    //             partPickOver = true;
    //         } else {
    //             props.team.getMembers().map((v) => {
    //                 if (!v.isPicked()) {
    //                     arr.push(v);
    //                 }
    //             });
    //         }

    //         if (arr.length > 0) {
    //             // 룰렛 array 저장
    //             setRouletteArray(arr);
    //             setRoutletteRun(true);
    //         } else {
    //             setRouletteDlg(true);
    //             setMsg(
    //                 partPickOver
    //                     ? "팀의 현재 페이즈에서 선택 제한을 넘겼습니다"
    //                     : "팀에 선택할 수 있는 시청자가 없습니다"
    //             );
    //         }
    //     }
    // };

    return (
        <>
            <TeamList
                teamName={team.getName()}
                teamList={teamList}
                teamListDisplay={teamListDisplay}
                summonUser={summonUser}
                setDlgTeamName={setDlgTeamName}
                runRoulette={runRoulette}
                changeUserStatePicked={changeUserStatePicked}
            />

            {/* <UserDialog
                nego={isNego}
                team={team.getTeamNum()}
                user={pickedUser!}
                chat={chatLog}
                display={display}
                use={(msg: Message) => {}}
                skip={skip}
                close={close}
            /> */}
        </>
    );
};

export default TeamListContainer;
