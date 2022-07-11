import { useState } from "react";
import User from "../../data/user";
import Team from "../../data/team";

type TeamList = {
    team: Team;
    updateTeam: (t: Team) => void;
};

const useTeamList = ({ team, updateTeam }: TeamList) => {
    const [rouletteRun, setRouletteRun] = useState(false);

    const runRoulette = () => {
        setRouletteRun(true);
    };

    // 유저 픽 가능 유무 변경
    // const changeUserStatePicked = (user: User) => {
    //     if (hasMember(team, user.getUserId())) {
    //         getMember(team, user.getUserId()).setPicked();
    //     }

    //     updateTeam(team);
    // };

    return { runRoulette }; //, changeUserStatePicked };
};

export default useTeamList;
