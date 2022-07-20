import localforage from "localforage";
import { useEffect, useState } from "react";
import Team, { emptyTeam } from "../data/team";
import User, { emptyUser } from "../data/user";

const useStorage = () => {
    const [userList, setUserList] = useState<Array<User>>([]);
    const [team1, setTeam1] = useState<Team>(emptyTeam);
    const [team2, setTeam2] = useState<Team>(emptyTeam);
    const [team1list, setTeam1List] = useState<Array<string>>([]);
    const [team2list, setTeam2List] = useState<Array<string>>([]);

    useEffect(() => {
        const initialize = () => {
            resetTeam();

            // 초기값 등록
            const team1 = {
                teamNum: 1,
                teamName: "TEAM 1",
                pickList: [],
                cpick: 0,
                cban: 0,
            };
            console.log("team1 init");
            setTeamInfo(1, team1);

            const team2 = {
                teamNum: 2,
                teamName: "TEAM 2",
                pickList: [],
                cpick: 0,
                cban: 0,
            };
            console.log("team2 init");
            setTeamInfo(2, team2);
        };
        initialize();
    }, []);

    const getTeamInfo = async (teamNum: number) => {
        try {
            console.log("// team info");
            const team = await localforage.getItem<Team>(`team${teamNum}`);
            if (team) return team;
            else return emptyTeam;
        } catch (e) {
            console.log(e);
            return emptyTeam;
        }
    };

    const setTeamInfo = async (teamNum: number, team: Team) => {
        await localforage.setItem<Team>(`team${teamNum}`, team);
        teamNum === 1 && setTeam1(team);
        teamNum === 2 && setTeam2(team);
    };

    const resetTeam = async () => {
        localforage.clear();
        setUserList([]);
        setTeam1(emptyTeam);
        setTeam2(emptyTeam);
        setTeam1List([]);
        setTeam2List([]);
    };

    const addUser = async (teamNum: number, user: User) => {
        try {
            let teamlist = await localforage.getItem<Array<string>>(`team${teamNum}list`);
            let userList = await localforage.getItem<Array<User>>(`userlist`);

            // userlist 자체가 없으면 추가
            if (!teamlist) {
                teamlist = new Array<string>();
            }
            if (!userList) {
                userList = new Array<User>();
            }

            // 리스트에 중복 없으면 추가
            const checkDupe = teamlist.includes(user.id);
            if (!checkDupe) {
                teamlist.push(user.id);
            }

            await localforage.setItem(`team${teamNum}list`, teamlist);
            teamNum === 1 && setTeam1List(teamlist);
            teamNum === 2 && setTeam2List(teamlist);

            await localforage.setItem<Array<User>>(`userlist`, [...userList, user]);
            setUserList([...userList, user]);
        } catch (e) {
            console.log(e);
        }
    };

    const removeUser = async (teamNum: number, id: string) => {
        try {
            const teamlist = await localforage.getItem<Array<string>>(`team${teamNum}list`);
            const newTeamList = teamlist!.filter((x) => x !== id);

            await localforage.setItem(`team${teamNum}list`, newTeamList);
            teamNum === 1 && setTeam1List(newTeamList);
            teamNum === 2 && setTeam2List(newTeamList);
        } catch (e) {
            console.log(e);
        }
    };

    const hasUser = async (teamNum: number, id: string) => {
        try {
            console.log(`${teamNum} ${id}`);
            const userlist = await localforage.getItem<Array<string>>(`team${teamNum}list`);
            console.log(userlist);
            if (!userlist) return false;
            console.log(userlist.filter((x) => x === id));
            return userlist.filter((x) => x === id).length > 0 ? true : false;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const getUser = async (id: string) => {
        try {
            const userlist = await localforage.getItem<Array<User>>(`userlist`);

            if (!userlist) return emptyUser;
            return userlist.filter((x) => x.id === id)[0];
        } catch (e) {
            console.log(e);
            return emptyUser;
        }
    };

    const updateUser = async (user: User) => {
        try {
            const userlist = await localforage.getItem<Array<User>>(`userlist`);

            if (userlist) {
                userlist.filter((x) => x.id === user.id)[0].lastChat = user.lastChat;
                userlist.filter((x) => x.id === user.id)[0].picked = user.picked;

                await localforage.setItem(`userlist`, userlist);
                setUserList(userlist);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return {
        userList,
        team1,
        team1list,
        team2,
        team2list,
        addUser,
        removeUser,
        hasUser,
        getUser,
        updateUser,
        resetTeam,
        getTeamInfo,
        setTeamInfo,
    };
};

export default useStorage;
