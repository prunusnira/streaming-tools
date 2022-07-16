type Message = {
    id: string;
    name: string;
    msg: string;
    time: number;
    timeInTxt: string;
    ban: boolean;
};

export const getFormatDate = (time: number) => {
    const date = new Date(time);
    const year = date.getFullYear().toString(); //yyyy
    const monthInNum = 1 + date.getMonth(); //M
    const month = monthInNum >= 10 ? monthInNum.toString() : "0" + monthInNum.toString(); //month 두자리로 저장
    const dayInNum = date.getDate(); //d
    const day = dayInNum >= 10 ? dayInNum.toString() : "0" + dayInNum.toString(); //day 두자리로 저장

    const hr = date.getHours().toString();
    const minInNum = date.getMinutes();
    const min = minInNum >= 10 ? minInNum.toString() : "0" + minInNum.toString();
    const secInNum = date.getSeconds();
    const sec = secInNum >= 10 ? secInNum.toString() : "0" + secInNum.toString();

    return year + "/" + month + "/" + day + " " + hr + ":" + min + ":" + sec; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
};

export const emptyMessage: Message = {
    id: "",
    name: "",
    msg: "",
    time: 0,
    timeInTxt: "",
    ban: false,
};

export default Message;
