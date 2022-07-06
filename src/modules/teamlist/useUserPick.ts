import { useState } from "react";
import Message from "../../data/message";
import User from "../../data/user";

const useUserPick = () => {
    const [pickedUser, setPickedUser] = useState<User | null>(null);
    const [chatLog, setChatLog] = useState<Array<Message>>([]);

    return { pickedUser, setPickedUser, chatLog, setChatLog };
};

export default useUserPick;
