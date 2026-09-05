import { useContext } from "react";
import { LoginStatusType } from "@banpick/features/streamer/model/loginStatus";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";

export const useLogin = () => {
    const { accounts } = useContext(StreamerContext);
    if (accounts === undefined) return { loginStatus: LoginStatusType.None };
    return {
        loginStatus: accounts.length > 0 ? LoginStatusType.Signed : LoginStatusType.NotSigned,
    };
};
