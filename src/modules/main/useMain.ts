import { useEffect, useRef, useState } from "react";
import Message, { emptyMessage } from "../../data/message";
import { PageMode } from "../../data/pageMode";
import User, { emptyUser } from "../../data/user";
import Team from "../../data/team";

const useMain = () => {
    const [pageMode, setPageMode] = useState(PageMode.UserList);

    const [team1, setTeam1] = useState<Team>({
        teamNum: 1,
        teamName: "TEAM 1",
        members: new Array<User>(),
        pickList: new Array<Message>(),
        cban: 0,
        cpick: 0,
    });

    const [team2, setTeam2] = useState<Team>({
        teamNum: 2,
        teamName: "TEAM 2",
        members: new Array<User>(),
        pickList: new Array<Message>(),
        cban: 0,
        cpick: 0,
    });

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [hideTeamList, setHideTeamList] = useState(false);

    const currentUserLastMessage = useRef<Message>(emptyMessage);
    const currentUserSubscribed = useRef<boolean>(false);
    const currentUserTeam = useRef<number>(0);

    useEffect(() => {
        console.log("// members check");
        console.log(team1.members.length);
        console.log(team2.members.length);
        // localStorageUpdate();
    }, [team1, team2]);

    const addMember = (teamNum: number, user: User) => {
        if (teamNum === 1) {
            const members = [...team1.members];
            members.push(user);
            setTeam1({
                ...team1,
                members,
            });
        } else if (teamNum === 2) {
            const members = [...team2.members];
            members.push(user);
            setTeam2({
                ...team2,
                members,
            });
        }
    };

    const getMember = (teamNum: number, id: string) => {
        const team = teamNum === 1 ? team1 : team2;
        console.log("teamchk");
        console.log(team);
        const check = team.members.filter((x) => x.id === id);
        return check.length > 0 ? check[0] : emptyUser;
    };

    const hasMember = (teamNum: number, userId: string) => {
        console.log(`// hasmember check ${userId}`);
        console.log(team1.members.length);
        console.log(team2.members.length);
        return teamNum === 1
            ? team1.members.filter((x) => x.id === userId).length > 0
            : team2.members.filter((x) => x.id === userId).length > 0;
    };

    const removeMember = (teamNum: number, id: string) => {
        const team = teamNum === 1 ? team1 : team2;
        let num = -1;
        for (let i = 0; i < team.members.length; i++) {
            if (team.members[i].id === id) {
                num = i;
            }
        }
        if (num !== -1) team.members.splice(num, 1);
    };

    const addPick = (teamNum: number, msg: Message) => {
        teamNum === 1
            ? setTeam1({
                  ...team1,
                  pickList: [...team1.pickList, msg],
                  cpick: team1.cpick + 1,
              })
            : setTeam2({
                  ...team2,
                  pickList: [...team2.pickList, msg],
                  cpick: team2.cpick + 1,
              });
    };

    const removePick = (teamNum: number, idx: number) => {
        if (teamNum === 1) {
            const newlist = team1.pickList.splice(idx, 1);
            setTeam1({
                ...team1,
                pickList: newlist,
                cpick: team1.cpick - 1,
            });
        } else {
            const newlist = team2.pickList.splice(idx, 1);
            setTeam2({
                ...team2,
                pickList: newlist,
                cpick: team2.cpick - 1,
            });
        }
    };

    const getNextPick = () => {
        return team1.cpick + team2.cpick;
    };

    const reset = () => {
        setTeam1({
            teamNum: 1,
            teamName: "TEAM 1",
            members: new Array<User>(),
            pickList: new Array<Message>(),
            cban: 0,
            cpick: 0,
        });
        setTeam2({
            teamNum: 2,
            teamName: "TEAM 2",
            members: new Array<User>(),
            pickList: new Array<Message>(),
            cban: 0,
            cpick: 0,
        });
    };

    const resetPick = () => {
        setTeam1({ ...team1, cpick: 0 });
        setTeam2({ ...team2, cpick: 0 });
    };

    const changeTeamName = (teamNum: number, title: string) => {
        teamNum === 1
            ? setTeam1({ ...team1, teamName: title })
            : setTeam2({ ...team2, teamName: title });
    };

    const getMemberList = (teamNum: number) => {
        const team = teamNum === 1 ? team1 : team2;
        return team.members;
    };

    const getTeamName = (teamNum: number) => {
        const team = teamNum === 1 ? team1 : team2;
        return team.teamName;
    };

    const localStorageUpdate = () => {
        localStorage.setItem("team1", JSON.stringify(team1));
        localStorage.setItem("team2", JSON.stringify(team2));
    };

    return {
        pageMode,
        setPageMode,
        hideTeamList,
        setHideTeamList,
        selectedUser,
        setSelectedUser,

        team1,
        team2,
        setTeam1,
        setTeam2,

        addMember,
        getMember,
        getMemberList,
        hasMember,
        removeMember,
        addPick,
        removePick,

        getNextPick,
        reset,
        resetPick,

        changeTeamName,
        getTeamName,
    };
};

export default useMain;
