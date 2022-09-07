import React, { useState } from "react";
import { StreamerType } from "../../data/user";

const initUser: StreamerType = {
    acctok: "",
    userid: "",
    iconurl: "",
    displayname: "",
};

type StreamerContextType = {
    data: StreamerType;
    loadStreamer: () => void;
    updateStreamer: (user: StreamerType) => void;
};

export const StreamerContext = React.createContext<StreamerContextType>({
    data: initUser,
    loadStreamer: () => {},
    updateStreamer: (user: StreamerType) => {},
});

type ProviderProps = {
    children: React.ReactNode;
};

const StreamerProvider = ({ children }: ProviderProps) => {
    const [acctok, setAcctok] = useState("");
    const [userid, setUserid] = useState("");
    const [iconurl, setIconurl] = useState("");
    const [displayname, setDisplayname] = useState("");

    const loadStreamer = () => {
        // 최초 로딩 시 로컬스토리지에서 데이터를 가져옴
        const streamer = localStorage.getItem("streamer");
        if (streamer) {
            const info = JSON.parse(streamer) as StreamerType;
            setAcctok(info.acctok);
            setUserid(info.userid);
            setIconurl(info.iconurl);
            setDisplayname(info.displayname);
        }
    };

    const updateStreamer = (user: StreamerType) => {
        setAcctok(user.acctok);
        setUserid(user.userid);
        setIconurl(user.iconurl);
        setDisplayname(user.displayname);

        localStorage.setItem("streamer", JSON.stringify(user));
    };

    return (
        <StreamerContext.Provider
            value={{
                data: {
                    acctok,
                    userid,
                    iconurl,
                    displayname,
                },
                loadStreamer,
                updateStreamer,
            }}
        >
            {children}
        </StreamerContext.Provider>
    );
};

export default StreamerProvider;
