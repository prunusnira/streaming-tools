import { useEffect, useState } from "react";
import Message from "../../../data/message";
import User from "../../../data/user";

type Props = {
    selectedUser: User;
};

const useUserDlg = ({ selectedUser }: Props) => {
    const [dlgUser, setDlgUser] = useState(false);
    const [isNego, setNego] = useState(false);
    const [chatLog, setChatLog] = useState<Array<Message>>([]);

    useEffect(() => {
        if (dlgUser) {
            // 최초 로딩 시 사용자의 lastchat을 chatlog에 추가
            console.log("lastchat");
            console.log(selectedUser.lastChat);
            setChatLog([selectedUser.lastChat]);
        }
    }, [dlgUser]);

    const skipUser = (user: User) => {
        // 현재 사용자를 처리함으로 표기하고 닫기
        user.picked = true;
        closeUserDlg();
    };

    const closeUserDlg = () => {
        setDlgUser(false);
    };

    const openUserDlg = () => {
        setDlgUser(true);
    };

    return { dlgUser, isNego, setNego, chatLog, skipUser, openUserDlg, closeUserDlg };
};

export default useUserDlg;
