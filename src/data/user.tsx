class User {
    id: string;
    name: string;
    recentMsg: string;
    team: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.recentMsg = "";
        this.team = 0;
    }
}

export default User;