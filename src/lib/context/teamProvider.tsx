import React, { useState } from "react";
import { Message } from "../../data/message";
import { TeamInfoType } from "../../data/team";
import { UserType } from "../../data/user";

const initTeam: TeamInfoType = {
    num: 0,
    name: "TEAM",
    pickList: [],
    curPick: 0,
    curBan: 0,
    totalPick: 0,
};

type TeamContextType = {
    team1: TeamInfoType;
    team2: TeamInfoType;
    userList: Array<UserType>;
    updateTeam1: (data: TeamInfoType) => void;
    updateTeam2: (data: TeamInfoType) => void;
    updateUserList: (list: Array<UserType>) => void;
    resetTeam: () => void;
};

export const TeamContext = React.createContext<TeamContextType>({
    team1: initTeam,
    team2: initTeam,
    userList: [],
    updateTeam1: (data: TeamInfoType) => {},
    updateTeam2: (data: TeamInfoType) => {},
    updateUserList: (list: Array<UserType>) => {},
    resetTeam: () => {},
});

type ProviderProps = {
    children: React.ReactNode;
};

const TeamProvider = ({ children }: ProviderProps) => {
    const [team1Num, setTeam1Num] = useState(1);
    const [team1Name, setTeam1Name] = useState("TEAM 1");
    const [team1PickList, setTeam1PickList] = useState<Array<Message>>([]);
    const [team1CurPick, setTeam1CurPick] = useState(0);
    const [team1CurBan, setTeam1CurBan] = useState(0);
    const [team1TotalPick, setTeam1TotalPick] = useState(0);

    const [team2Num, setTeam2Num] = useState(2);
    const [team2Name, setTeam2Name] = useState("TEAM 2");
    const [team2PickList, setTeam2PickList] = useState<Array<Message>>([]);
    const [team2CurPick, setTeam2CurPick] = useState(0);
    const [team2CurBan, setTeam2CurBan] = useState(0);
    const [team2TotalPick, setTeam2TotalPick] = useState(0);

    const [userList, setUserList] = useState<Array<UserType>>([]);

    const updateTeam1 = (data: TeamInfoType) => {
        setTeam1Num(data.num);
        setTeam1Name(data.name);
        setTeam1PickList(data.pickList);
        setTeam1CurPick(data.curPick);
        setTeam1CurBan(data.curBan);
        setTeam1TotalPick(data.totalPick);
    };

    const updateTeam2 = (data: TeamInfoType) => {
        setTeam2Num(data.num);
        setTeam2Name(data.name);
        setTeam2PickList(data.pickList);
        setTeam2CurPick(data.curPick);
        setTeam2CurBan(data.curBan);
        setTeam2TotalPick(data.totalPick);
    };

    const updateUserList = (list: Array<UserType>) => {
        setUserList((prev) => [...list]);
    };

    const resetTeam = () => {
        setTeam1Num(1);
        setTeam1Name("TEAM 1");
        setTeam1PickList([]);
        setTeam1CurPick(0);
        setTeam1CurBan(0);
        setTeam1TotalPick(0);
        setTeam2Num(2);
        setTeam2Name("TEAM 2");
        setTeam2PickList([]);
        setTeam2CurPick(0);
        setTeam2CurBan(0);
        setTeam2TotalPick(0);
        setUserList([]);
    };

    return (
        <TeamContext.Provider
            value={{
                team1: {
                    num: team1Num,
                    name: team1Name,
                    pickList: team1PickList,
                    curPick: team1CurPick,
                    curBan: team1CurBan,
                    totalPick: team1TotalPick,
                },
                team2: {
                    num: team2Num,
                    name: team2Name,
                    pickList: team2PickList,
                    curPick: team2CurPick,
                    curBan: team2CurBan,
                    totalPick: team2TotalPick,
                },
                userList,
                updateTeam1,
                updateTeam2,
                updateUserList,
                resetTeam,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export default TeamProvider;
