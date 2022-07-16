import { useState } from "react";
import Message from "../../data/message";
import { PageMode } from "../../data/pageMode";
import User from "../../data/user";

const useMain = () => {
    const [pageMode, setPageMode] = useState(PageMode.UserList);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [hideTeamList, setHideTeamList] = useState(false);
    const [selectedChatLog, setChatLog] = useState<Array<Message>>([]);

    return {
        pageMode,
        setPageMode,
        hideTeamList,
        setHideTeamList,
        selectedUser,
        setSelectedUser,
        selectedChatLog,
        setChatLog,
    };
};

export default useMain;
