class Message {
    private id: string;
    private name: string;
    private msg: string;
    private time: string;
    private ban: boolean;

    constructor(id: string, name: string, msg: string) {
        this.id = id;
        this.name = name;
        this.msg = msg;
        this.time = this.getFormatDate(new Date());
        this.ban = false;
    }

    getFormatDate = (date: Date) => {
        const year = date.getFullYear().toString();              //yyyy
        const monthInNum = (1 + date.getMonth());          //M
        const month = monthInNum >= 10 ? monthInNum.toString() : '0' + monthInNum.toString();  //month 두자리로 저장
        const dayInNum = date.getDate();                   //d
        const day = dayInNum >= 10 ? dayInNum.toString() : '0' + dayInNum.toString();          //day 두자리로 저장

        const hr = date.getHours().toString();
        const minInNum = date.getMinutes();
        const min = minInNum >= 10 ? minInNum.toString() : '0' + minInNum.toString();
        const secInNum = date.getSeconds();
        const sec = secInNum >= 10 ? secInNum.toString() : '0' + secInNum.toString();

        return  year + '/' + month + '/' + day + ' ' + hr + ':' + min + ':' + sec;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }

    getTime = () => { return this.time; }
    getMessage = () => { return this.msg; }
    getUserName = () => { return this.name; }
    getUserId = () => { return this.id; }
    getBanStatus = () => { return this.ban; }

    setMessage = (msg: string) => { this.msg = msg; }
    setBan = () => { this.ban = true; }
    undoBan = () => { this.ban = false; }
}

export default Message;