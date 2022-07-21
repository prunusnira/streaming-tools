import { useEffect, useState } from "react";
import Message from "../../../data/message";
import { Phase } from "../../../data/phase";
import Team from "../../../data/team";
import User, { emptyUser } from "../../../data/user";
import { IBanpickData } from "../../main/useBanpickData";

type Props = {
    team1: Team;
    team2: Team;
    team1list: Array<string>;
    team2list: Array<string>;
    userList: Array<User>;
    banpickData: IBanpickData;
    setTeamInfo: (tn: number, t: Team) => void;
    updateUser: (user: User) => void;
};

const useUserDlg = ({
    team1,
    team2,
    team1list,
    team2list,
    userList,
    banpickData,
    setTeamInfo,
    updateUser,
}: Props) => {
    const [dlgUser, setDlgUser] = useState(false);
    const [picked, setPicked] = useState<User>(emptyUser);
    const [isNego, setNego] = useState(false);
    const [chatList, setChatList] = useState<Array<Message>>([]);

    const useMessage = (idx: number) => {
        if (picked) {
            // 어디 포함되었는지 확인 한 후 해당 팀 picklist에 추가
            const msg = chatList[idx];
            const team = checkTeam(msg.id);
            if (team === 1) {
                team1.cpick++;

                if (team1.cpick + team2.cpick >= banpickData.turnPick * 2) {
                    banpickData.setPhase(Phase.BAN);
                    setTeamInfo(1, {
                        ...team1,
                        pickList: [...team1.pickList, msg],
                        cpick: 0,
                    });
                    setTeamInfo(2, { ...team2, cpick: 0 });
                } else {
                    setTeamInfo(1, { ...team1, pickList: [...team1.pickList, msg] });
                }
            } else if (team === 2) {
                team2.cpick++;

                if (team1.cpick + team2.cpick >= banpickData.turnPick * 2) {
                    banpickData.setPhase(Phase.BAN);
                    setTeamInfo(1, { ...team1, cpick: 0 });
                    setTeamInfo(2, {
                        ...team2,
                        pickList: [...team2.pickList, msg],
                        cpick: 0,
                    });
                } else {
                    setTeamInfo(2, { ...team2, pickList: [...team2.pickList, msg] });
                }
            }
            const user = userList.filter((x) => x.id === msg.id)[0];
            user.picked = true;
            updateUser(user);
            setDlgUser(false);
        }
    };

    const skipMessage = () => {
        if (picked) {
            const user = userList.filter((x) => x.id === picked.id)[0];
            user.picked = true;
            updateUser(user);
            setDlgUser(false);
        }
    };

    const checkTeam = (id: string) => {
        return team1list.filter((x) => x === id).length > 0
            ? 1
            : team2list.filter((x) => x === id).length > 0
            ? 2
            : 0;
    };

    return {
        dlgUser,
        setDlgUser,
        picked,
        setPicked,
        isNego,
        setNego,
        chatList,
        setChatList,

        useMessage,
        skipMessage,
    };
};

export default useUserDlg;
