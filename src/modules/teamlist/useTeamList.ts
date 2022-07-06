import { useState } from "react";
import User from "../../data/user";
import Team from "./team";

type TeamList = {
    team: Team;
    updateTeam: (t: Team, n: number) => void;
};

const useTeamList = ({ team, updateTeam }: TeamList) => {
    const [teamList, setTeamList] = useState<Array<User>>(team.getMembers());
    const [rouletteRun, setRouletteRun] = useState(false);

    // 팀명 변경
    const changeTeamName = (name: string) => {
        team.setName(name);
        updateTeam(team, team.getTeamNum());
    };

    const runRoulette = () => {
        setRouletteRun(true);
    };

    // 유저 픽 가능 유무 변경
    const changeUserStatePicked = (user: User) => {
        if (team.hasMember(user.getUserId())) {
            team.changePickable(user.getUserId());
        }

        updateTeam(team, team.getTeamNum());
    };

    return { teamList, changeTeamName, runRoulette, changeUserStatePicked };
};

export default useTeamList;
