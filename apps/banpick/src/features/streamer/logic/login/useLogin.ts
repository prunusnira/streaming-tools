import { useContext, useEffect, useState } from "react";
import { LoginStatusType } from "@banpick/features/streamer/model/loginStatus";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { apiValidate } from "../api/validate";
import { apiGetUsers } from "../api/user";
import { getAccessTokenFromCookie, getAccessTokenFromHash } from "./oauthAccessToken";

export const useLogin = () => {
    const [loginStatus, setLoginStatus] = useState(LoginStatusType.None);
    const { data, updateStreamer } = useContext(StreamerContext);

    useEffect(() => {
        const login = async () => {
            if (data.acctok === "") {
                const accessToken = getAccessTokenFromHash(window.location.hash) || getAccessTokenFromCookie();

                if (accessToken === "") {
                    const loginUrl = import.meta.env.VITE_URL_LOGIN!;
                    const clientId = import.meta.env.VITE_CLIENT_ID!;
                    const redirectUri = import.meta.env.VITE_REDIR_URI!;
                    window.location.href = `${loginUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=chat:read+user:read:email`;
                } else {
                    const userid = await validateLogin(accessToken);
                    await getUserData(userid, accessToken);
                    setLoginStatus(LoginStatusType.Signed);
                }
            } else {
                setLoginStatus(LoginStatusType.Signed);
            }
        };

        loginStatus === LoginStatusType.None && login();
    }, []);

    const validateLogin = (acctok: string) => {
        return apiValidate(acctok)
            .then((res: any) => {
                const resLoginName = res.data.login as string;
                return resLoginName;
            })
            .catch((err) => {
                // validation failed
                return "";
            });
    };

    const getUserData = (userid: string, acctok: string) => {
        return apiGetUsers(userid, acctok).then((res: any) => {
            const iconurl = res.data.data[0].profile_image_url as string;
            const displayname = res.data.data[0].display_name as string;
            updateStreamer({
                acctok: acctok,
                userid: userid,
                iconurl: iconurl,
                displayname: displayname,
            });
        });
    };

    return { loginStatus };
};
