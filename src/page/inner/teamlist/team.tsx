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
}

export default Team;