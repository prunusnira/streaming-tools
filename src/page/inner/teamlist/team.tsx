import User from "../../../data/user";

class Team {
    teamNum: number;
    members: Array<User>;

    constructor(team: number) {
        this.teamNum = team;
        this.members = new Array<User>();
    }

    addMember = (user: User) => {
        this.members.push(user);
    }

    hasMember = (id: string) => {
        let isMember = false;
        this.members.forEach(m => {
            if(m.id === id) {
                isMember = true;
            }
        });
        return isMember;
    }

    removeMember = (id: string) => {
        let num = -1;
        for(let i = 0; i < this.members.length; i++) {
            if(this.members[i].id === id) {
                num = i;
            }
        }
        if(num !== -1)
            this.members = this.members.splice(num, 1);
    }
}

export default Team;