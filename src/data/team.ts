import Message from "./message";

type Team = {
    teamNum: number;
    teamName: string;
    pickList: Array<Message>;
    cpick: number;
    cban: number;
};

export const emptyTeam: Team = {
    teamNum: 0,
    teamName: "",
    pickList: [],
    cpick: 0,
    cban: 0,
};

export default Team;
