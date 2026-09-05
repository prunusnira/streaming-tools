import React, { useCallback, useState } from "react";
import type { AuthProvider } from "@streaming-tools/auth";
import { Message } from "@banpick/features/banpick/model/message";
import { emptyUser, UserType } from "@banpick/features/streamer/model/user";

type InitVal = {
    width: string | number;
    maxWidth: number;
    active: boolean;
};

type ConnectionErrors = Partial<Record<AuthProvider, string>>;

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
    liveChatHistory: Array<Message>(),
    connectionErrors: {} as ConnectionErrors,
    initTime: 0,
    changePickedUser: (user: UserType) => {},
    changeNegoMode: (n: boolean) => {},
    addTalkHistory: (msg: Message) => {},
    addLiveChatMessage: (msg: Message) => {},
    resetTalkHistory: () => {},
    openTalkDialog: () => {},
    closeTalkDialog: () => {},
    setConnectionError: (_provider: AuthProvider, _message?: string) => {},
});

type ProviderProps = {
    children: React.ReactNode;
};

export const TalkProvider = ({ children }: ProviderProps) => {
    const [width] = useState<number | string>("90%");
    const [maxWidth] = useState(1000);
    const [active, setActive] = useState(false);
    const [initTime, setInitTime] = useState(0);

    const [pickedUser, setPickedUser] = useState(emptyUser);
    const [negoMode, setNegoMode] = useState(false);
    const [talkHistory, setTalkHistory] = useState<Array<Message>>([]);
    const [liveChatHistory, setLiveChatHistory] = useState<Array<Message>>([]);
    const [connectionErrors, setConnectionErrors] = useState<ConnectionErrors>({});

    const setConnectionError = useCallback((provider: AuthProvider, message?: string) => {
        setConnectionErrors((previous) => {
            if (!message) {
                const remaining = { ...previous };
                delete remaining[provider];
                return remaining;
            }

            return { ...previous, [provider]: message };
        });
    }, []);

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

    const addLiveChatMessage = (msg: Message) => {
        setLiveChatHistory((prev) => [...prev.slice(-199), msg]);
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
                liveChatHistory,
                connectionErrors,
                initTime,
                changePickedUser,
                changeNegoMode,
                addTalkHistory,
                addLiveChatMessage,
                resetTalkHistory,
                openTalkDialog,
                closeTalkDialog,
                setConnectionError,
            }}
        >
            {children}
        </TalkContext.Provider>
    );
};
