import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User, { emptyUser } from "../../data/user";
import requestUserProfile from "../../data/userProfile";
import { RootState } from "../../redux/reducer";

const useHeader = () => {
    const [streamer, setStreamer] = useState(emptyUser);
    const dispatch = useDispatch();

    const { loginName, acctok, clientId, userId } = useSelector((state: RootState) => state.user);
    useEffect(() => {
        requestUserProfile(loginName, acctok, clientId, updateStreamerInfo);
    }, []);

    const updateStreamerInfo = (map: Map<string, string>) => {
        const info: User = {
            id: map.get("login")!,
            name: map.get("display_name")!,
            subs: true,
            picked: false,
            profileUrl: map.get("profile_image_url")!,
            lastChat: {
                id: "",
                name: "",
                msg: "",
                time: "",
                ban: false,
            },
        };

        setStreamer(info);
    };

    const tokenReset = () => {
        dispatch({ type: "removeUser" });
    };

    return {
        streamer,
        tokenReset,
    };
};

export default useHeader;
