import React, { useState } from "react";
import Message from "../../data/message";
import User from "../../data/user";
import TeamNameChangeDlg from "../dialog/teamNameChange/teamNameChange";
import UserDialog from "../dialog/userDialog/userdlg";
import useUserDlg from "../dialog/userDialog/useUserDlg";
import Team, { emptyTeam } from "../../data/team";
import TeamList from "./teamlist";
import "./teamlist.css";
import useTeamList from "./useTeamList";
import RouletteDialog from "../roulette/rouletteDialog";
import useRoulette from "../roulette/useRoulette";

interface Props {
    team: Team;
    teamList: Array<User>;
    teamListDisplay: boolean;
    setTeamInfo: (teamNum: number, team: Team) => Promise<void>;
    selectedUser: User | null;
    setSelectedUser: (u: User) => void;
}

const TeamListContainer = ({ team, teamList, teamListDisplay, setTeamInfo }: Props) => {
    const { teamName, changeTeamName, dialogTNChange, setTNChange } = useTeamList({
        team,
        teamList,
        setTeamInfo,
    });

    const { dlgRoulette, setDlgRoulette, pickedUser, runRoulette } = useRoulette({
        members: teamList,
    });

    const { dlgUser, isNego, setNego, chatLog, skipUser, openUserDlg, closeUserDlg } = useUserDlg({
        selectedUser: pickedUser,
    });

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
                teamName={team.teamName}
                teamList={teamList}
                teamListDisplay={teamListDisplay}
                summonUser={summonUser}
                setDlgTN={setTNChange}
                runRoulette={runRoulette}
            />

            <TeamNameChangeDlg
                display={dialogTNChange}
                teamName={teamName}
                changeTeamName={(name: string) => {
                    changeTeamName(name);
                    setTNChange(false);
                }}
                close={() => {
                    setTNChange(false);
                }}
            />

            <RouletteDialog
                display={dlgRoulette}
                pickedUser={pickedUser}
                onClose={() => openUserDlg()}
            />

            <UserDialog
                nego={isNego}
                team={team.teamNum}
                user={pickedUser}
                chat={chatLog}
                display={dlgUser}
                use={(msg: Message) => {}}
                skip={skipUser}
                close={closeUserDlg}
            />
        </>
    );
};

export default TeamListContainer;
