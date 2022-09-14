import React, { useEffect, useState } from "react";
import { Message } from "../../data/message";
import { emptyUser, UserType } from "../../data/user";

type InitVal = {
    width: string | number;
    maxWidth: number;
    active: boolean;
};

const initModal: InitVal = {
    width: "90%",
    maxWidth: 1000,
    active: false,
};

export const TalkContext = React.createContext({
    data: initModal,
    pickedUser: emptyUser,
    negoMode: false,
    talkHistory: Array<Message>(),
    initTime: 0,
    changePickedUser: (user: UserType) => {},
    changeNegoMode: (n: boolean) => {},
    addTalkHistory: (msg: Message) => {},
    resetTalkHistory: () => {},
    openTalkDialog: () => {},
    closeTalkDialog: () => {},
});

type ProviderProps = {
    children: React.ReactNode;
};

const TalkProvider = ({ children }: ProviderProps) => {
    const [width] = useState<number | string>("90%");
    const [maxWidth] = useState(1000);
    const [active, setActive] = useState(false);
    const [initTime, setInitTime] = useState(0);

    const [pickedUser, setPickedUser] = useState(emptyUser);
    const [negoMode, setNegoMode] = useState(false);
    const [talkHistory, setTalkHistory] = useState<Array<Message>>([]);

    const openTalkDialog = () => {
        setInitTime(Date.now());
        setActive(true);
    };
    const closeTalkDialog = () => {
        setTalkHistory([]);
        setActive(false);
        changeNegoMode(false);
    };

    const changePickedUser = (user: UserType) => {
        setPickedUser(user);
    };

    const changeNegoMode = (nego: boolean) => {
        setNegoMode(nego);
    };

    const addTalkHistory = (msg: Message) => {
        setTalkHistory((prev) => [...prev, msg]);
    };

    const resetTalkHistory = () => {
        setTalkHistory([]);
    };

    return (
        <TalkContext.Provider
            value={{
                data: {
                    width,
                    maxWidth,
                    active,
                },
                pickedUser,
                negoMode,
                talkHistory,
                initTime,
                changePickedUser,
                changeNegoMode,
                addTalkHistory,
                resetTalkHistory,
                openTalkDialog,
                closeTalkDialog,
            }}
        >
            {children}
        </TalkContext.Provider>
    );
};

export default TalkProvider;
