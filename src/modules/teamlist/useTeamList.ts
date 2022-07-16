import { useState } from "react";
import User from "../../data/user";
import Team from "../../data/team";

type TeamList = {
    team: Team;
    teamList: Array<User>;
    setTeamInfo: (teamNum: number, team: Team) => Promise<void>;
};

const useTeamList = ({ team, teamList, setTeamInfo }: TeamList) => {
    const [teamName, setTeamName] = useState(team.teamName);
    const [dialogTNChange, setTNChange] = useState(false);

    const changeTeamName = (newName: string) => {
        team.teamName = newName;
        setTeamInfo(team.teamNum, team);
        setTeamName(newName);
    };

    return {
        teamName,
        changeTeamName,

        dialogTNChange,
        setTNChange,
    };
};

export default useTeamList;
