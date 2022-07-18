import { useEffect, useState } from "react";
import Message from "../../../data/message";
import User, { emptyUser } from "../../../data/user";

const useUserDlg = () => {
    const [dlgUser, setDlgUser] = useState(false);
    const [picked, setPicked] = useState<User>(emptyUser);
    const [isNego, setNego] = useState(false);
    const [chatList, setChatList] = useState<Array<Message>>([]);

    useEffect(() => {
        console.log(picked.id);
    }, [picked]);

    return {
        dlgUser,
        setDlgUser,
        picked,
        setPicked,
        isNego,
        setNego,
        chatList,
        setChatList,
    };
};

export default useUserDlg;
