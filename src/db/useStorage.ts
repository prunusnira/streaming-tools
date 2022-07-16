import localforage from "localforage";
import { useEffect, useState } from "react";
import Team, { emptyTeam } from "../data/team";
import User, { emptyUser } from "../data/user";

const useStorage = () => {
    const [team1, setTeam1] = useState<Team>(emptyTeam);
    const [team2, setTeam2] = useState<Team>(emptyTeam);
    const [team1list, setTeam1List] = useState<Array<User>>([]);
    const [team2list, setTeam2List] = useState<Array<User>>([]);

    useEffect(() => {
        // 초기값 등록
        getTeamInfo(1).then((x) => {
            if (x.teamName === "") {
                const team = {
                    teamNum: 1,
                    teamName: "TEAM 1",
                    pickList: [],
                    cpick: 0,
                    cban: 0,
                };
                console.log("team1 init");
                setTeamInfo(1, team);
                setTeam1(team);
            }
        });
        getTeamInfo(2).then((x) => {
            if (x.teamName === "") {
                const team = {
                    teamNum: 2,
                    teamName: "TEAM 2",
                    pickList: [],
                    cpick: 0,
                    cban: 0,
                };
                console.log("team2 init");
                setTeamInfo(2, team);
                setTeam2(team);
            }
        });
        getTeamList(1).then((x) => {
            if (x) setTeam1List(x);
        });
        getTeamList(2).then((x) => {
            if (x) setTeam2List(x);
        });
    }, []);

    useEffect(() => {
        console.log("team check");
        console.log(team1);
    }, [team1]);

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

    const getTeamList = async (teamNum: number) => {
        return await localforage.getItem<Array<User>>(`team${teamNum}list`);
    };

    const resetTeam = async () => {
        localforage.clear();
        setTeam1(emptyTeam);
        setTeam2(emptyTeam);
        setTeam1List([]);
        setTeam2List([]);
    };

    const getUser = async (teamNum: number, user: User) => {
        try {
            let userlist = await localforage.getItem<Array<User>>(`team${teamNum}list`);

            if (!userlist) return null;
            const found = userlist.filter((x) => x.id === user.id);
            if (found.length > 0) return found[0];
            else return null;
        } catch (e) {
            console.log(e);
        }
    };

    const getUserById = async (teamNum: number, id: string) => {
        try {
            let userlist = await localforage.getItem<Array<User>>(`team${teamNum}list`);

            if (!userlist) return emptyUser;
            const found = userlist.filter((x) => x.id === id);
            if (found.length > 0) return found[0];
            else return emptyUser;
        } catch (e) {
            console.log(e);
            return emptyUser;
        }
    };

    const addUser = async (teamNum: number, user: User) => {
        try {
            let userlist = await localforage.getItem<Array<User>>(`team${teamNum}list`);

            // userlist 자체가 없으면 추가
            if (!userlist) {
                userlist = new Array<User>();
            }

            // 리스트에 중복 없으면 추가
            const checkDupe = userlist.filter((x) => x.id === user.id).length > 0;
            if (!checkDupe) {
                userlist.push(user);
            }

            localforage.setItem(`team${teamNum}list`, userlist);
            console.log("추가 후 state update");
            teamNum === 1 && setTeam1List(userlist);
            teamNum === 2 && setTeam2List(userlist);
        } catch (e) {
            console.log(e);
        }
    };

    const removeUser = async (teamNum: number, user: User) => {
        try {
            const userlist = await localforage.getItem<Array<User>>(`team${teamNum}list`);

            // 사용자 찾기
            if (userlist) {
                const removedList = userlist.filter((x) => x.id !== user.id);
                localforage.setItem(`team${teamNum}list`, removedList);
                teamNum === 1 && setTeam1List(removedList);
                teamNum === 2 && setTeam2List(removedList);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const hasUser = async (teamNum: number, user: User) => {
        try {
            const userlist = await localforage.getItem<Array<User>>(`team${teamNum}list`);

            if (!userlist) return false;
            const filtered = userlist.filter((x) => x.id === user.id);
            if (filtered.length > 0) return true;
            else return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const hasUserById = async (teamNum: number, id: string) => {
        try {
            const userlist = await localforage.getItem<Array<User>>(`team${teamNum}list`);

            if (!userlist) return false;
            const filtered = userlist.filter((x) => x.id === id);
            if (filtered.length > 0) return true;
            else return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const updateUser = async () => {};

    return {
        team1,
        team1list,
        team2,
        team2list,
        addUser,
        getUser,
        getUserById,
        removeUser,
        hasUser,
        hasUserById,
        getTeamList,
        resetTeamList: resetTeam,
        getTeamInfo,
        setTeamInfo,
    };
};

export default useStorage;
