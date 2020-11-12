import User from "../../../data/user";

class Team {
    teamNum: number;
    name: string;
    members: Array<User>;
    currentPick: number;
    currentBan: number;

    constructor(team: number, name: string) {
        this.teamNum = team;
        this.members = new Array<User>();
        this.name = name;
        this.currentPick = 0;
        this.currentBan = 0;
    }

    addMember = (user: User) => {
        this.members.push(user);
    }

    getMember = (id: string): User|null => {
        for(let i = 0; i < this.members.length; i++) {
            if(this.members[i].getUserId() === id) {
                return this.members[i];
            }
        }
        return null;
    }

    hasMember = (id: string) => {
        return this.getMember(id) === null ? false : true;
    }

    removeMember = (id: string) => {
        let num = -1;
        for(let i = 0; i < this.members.length; i++) {
            if(this.members[i].getUserId() === id) {
                num = i;
            }
        }
        if(num !== -1)
            this.members.splice(num, 1);
    }

    changePickable = (id: string) => {
        this.getMember(id)?.setPicked();
    }
}

export default Team;