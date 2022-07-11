import Message from "./message";
import User from "./user";

type Team = {
    teamNum: number;
    teamName: string;
    members: Array<User>;
    pickList: Array<Message>;
    cpick: number;
    cban: number;
};

export default Team;
