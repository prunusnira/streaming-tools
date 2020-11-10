class User {
    id: string;
    name: string;
    recentMsg: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.recentMsg = "";
    }
}

export default User;