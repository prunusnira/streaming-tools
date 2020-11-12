class User {
    private id: string;
    private name: string;
    private team: number;
    private subs: boolean;
    private picked: boolean;
    private profileUrl: string;

    constructor(id: string, name: string, subs: boolean) {
        this.id = id;
        this.name = name;
        this.team = 0;
        this.subs = subs;
        this.picked = false;
        this.profileUrl = "";
    }

    setPicked = () => {
        this.picked = !this.picked;
    }

    setProfileUrl = (url: string) => {
        this.profileUrl = url;
    }

    getUserId = () => { return this.id; }
    getUserName = () => { return this.name; }
    getProfileUrl = () => { return this.profileUrl; }
    isPicked = () => { return this.picked; }
}

export default User;