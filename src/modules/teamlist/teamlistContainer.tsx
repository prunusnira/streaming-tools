import React from "react";
import User from "../../data/user";
import Team from "../../data/team";
import TeamList from "./teamlist";
import "./teamlist.css";
import useTeamList from "./useTeamList";
import TeamNameChangeDlg from "../dialog/teamNameChange/teamNameChange";

interface Props {
    userList: Array<User>;
    team: Team;
    teamList: Array<string>;
    teamListDisplay: boolean;
    setTeamInfo: (teamNum: number, team: Team) => Promise<void>;
    runRoulette: (tn: number) => void;
    updateUser: (u: User) => void;
}

const TeamListContainer = ({
    userList,
    team,
    teamList,
    teamListDisplay,
    setTeamInfo,
    runRoulette,
    updateUser,
}: Props) => {
    const { teamName, changeTeamName, dialogTNChange, setTNChange, isPicked } = useTeamList({
        team,
        userList,
        teamList,
        setTeamInfo,
    });

    // 유저 강제 소환
    const summonUser = (user: string) => {
        // 다이얼로그 열기
    };

    return (
        <>
            <TeamList
                userList={userList}
                teamNum={team.teamNum}
                teamName={team.teamName}
                teamList={teamList}
                teamListDisplay={teamListDisplay}
                summonUser={summonUser}
                setDlgTN={setTNChange}
                runRoulette={runRoulette}
                isPicked={isPicked}
                updateUser={updateUser}
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
        </>
    );
};

export default TeamListContainer;
