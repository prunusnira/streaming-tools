import { useRef, useState } from "react";
import Message from "../../data/message";
import { PageMode } from "../../data/pageMode";
import User from "../../data/user";
import Team from "../teamlist/team";

// 전체 동작에 필요한 데이터 및 핵심 메소드 모음
const useMain = () => {
    const [pageMode, setPageMode] = useState(PageMode.UserList);
    const [team1, setTeam1] = useState(new Team(1, "TEAM 1"));
    const [team2, setTeam2] = useState(new Team(2, "TEAM 2"));
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [hideTeamList, setHideTeamList] = useState(false);

    const currentUserLastMessage = useRef<Message>(new Message("", "", ""));
    const currentUserSubscribed = useRef<boolean>(false);
    const currentUserTeam = useRef<number>(0);

    const updateTeam = (team: Team, teamNum: number) => {
        teamNum === 1 && setTeam1(team);
        teamNum === 2 && setTeam2(team);
    };

    return {
        pageMode,
        setPageMode,
        team1,
        team2,
        updateTeam,
        hideTeamList,
        setHideTeamList,
        selectedUser,
        setSelectedUser,
    };
};

export default useMain;
