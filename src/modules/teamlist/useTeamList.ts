import { useState } from "react";
import User from "../../data/user";
import Team from "../../data/team";

type TeamList = {
    team: Team;
    userList: Array<User>;
    teamList: Array<string>;
    setTeamInfo: (teamNum: number, team: Team) => Promise<void>;
};

const useTeamList = ({ team, userList, teamList, setTeamInfo }: TeamList) => {
    const [teamName, setTeamName] = useState(team.teamName);
    const [dialogTNChange, setTNChange] = useState(false);

    const changeTeamName = (newName: string) => {
        team.teamName = newName;
        setTeamInfo(team.teamNum, team);
        setTeamName(newName);
    };

    const isPicked = (id: string) => {
        const user = userList.filter((x) => x.id === id)[0];
        return user ? user.picked : false;
    };

    return {
        teamName,
        changeTeamName,

        dialogTNChange,
        setTNChange,

        isPicked,
    };
};

export default useTeamList;
