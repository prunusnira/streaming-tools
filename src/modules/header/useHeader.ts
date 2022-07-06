import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../data/user";
import requestUserProfile from "../../data/userProfile";
import { RootState } from "../../redux/reducer";

const useHeader = () => {
    const [streamer, setStreamer] = useState(new User("", "", false));
    const dispatch = useDispatch();

    const { loginName, acctok, clientId, userId } = useSelector((state: RootState) => state.user);
    useEffect(() => {
        requestUserProfile(loginName, acctok, clientId, updateStreamerInfo);
    }, []);

    const updateStreamerInfo = (map: Map<string, string>) => {
        console.log(map);
        const info = new User(map.get("login")!, map.get("display_name")!, true);
        info.setProfileUrl(map.get("profile_image_url")!);

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
