import { useContext, useEffect } from "react";
import { Phase } from "../../data/status";
import { StatusContext } from "../../lib/context/statusProvider";
import { TeamContext } from "../../lib/context/teamProvider";

const useController = () => {
    const { team1, team2, updateTeam1, updateTeam2 } = useContext(TeamContext);
    const { data, changePhase } = useContext(StatusContext);

    useEffect(() => {
        if (data.phase === Phase.Pick && team1.curPick + team2.curPick === data.pickPhase * 2) {
            changePhase(Phase.Ban);

            team1.curPick = 0;
            team2.curPick = 0;
            updateTeam1(team1);
            updateTeam2(team2);
        }
        if (data.phase === Phase.Ban && team1.curBan + team2.curBan === data.banPhase * 2) {
            changePhase(Phase.Pick);

            team1.curBan = 0;
            team2.curBan = 0;
            updateTeam1(team1);
            updateTeam2(team2);
        }
    }, [team1, team2]);
};

export default useController;
