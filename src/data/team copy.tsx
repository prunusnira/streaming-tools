import Message from "./message";
import User, { emptyUser } from "./user";

class TeamCP {
    teamNum: number;
    name: string;
    members: Array<User>;
    picklist: Array<Message>;
    currentPick: number;
    currentBan: number;

    constructor(team: number, name: string) {
        this.teamNum = team;
        this.members = new Array<User>();
        this.picklist = new Array<Message>();
        this.name = name;
        this.currentPick = 0;
        this.currentBan = 0;
    }

    setTeamNum = (teamNum: number) => {
        this.teamNum = teamNum;
    };

    getTeamNum = (): number => {
        return this.teamNum;
    };

    setName = (name: string) => {
        this.name = name;
    };

    getName = (): string => {
        return this.name;
    };

    addMember = (user: User) => {
        this.members.push(user);
    };

    getMember = (id: string): User => {
        const check = this.members.filter((x) => x.id === id);
        return check.length > 0 ? check[0] : emptyUser;
    };

    getMembers = (): User[] => {
        return this.members;
    };

    hasMember = (id: string) => {
        return this.getMember(id).id === "" ? false : true;
    };

    removeMember = (id: string) => {
        let num = -1;
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i].id === id) {
                num = i;
            }
        }
        if (num !== -1) this.members.splice(num, 1);
    };

    checkPickable = (id: string) => {
        return this.getMember(id)?.picked;
    };

    changePickable = (id: string) => {
        // this.getMember(id)?.picked = true;
    };

    getPickList = (): Message[] => {
        return this.picklist;
    };

    getOnePick = (idx: number): Message => {
        return this.picklist[idx];
    };

    addToPickList = (msg: Message) => {
        this.picklist.push(msg);
    };

    removeFromPickList = (idx: number) => {
        this.picklist.splice(idx, 1);
        this.currentPick--;
    };

    getCurrentPick = (): number => {
        return this.currentPick;
    };

    addCurrentPick = () => {
        this.currentPick++;
    };

    removeCurrentPick = () => {
        this.currentPick--;
    };

    resetCurrentPick = () => {
        this.currentPick = 0;
    };

    getCurrentBan = () => {
        return this.currentBan;
    };

    addCurrentBan = () => {
        this.currentBan++;
    };

    removeCurrentBan = () => {
        this.currentBan--;
    };

    resetCurrentBan = () => {
        this.currentBan = 0;
    };
}

export default TeamCP;
