import { useContext, useEffect, useState } from "react";
import { LoginStatusType } from "../../data/loginStatus";
import { StreamerContext } from "../../lib/context/streamerProvider";
import { apiValidate } from "../api/validate";
import { apiGetUsers } from "../api/user";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const [loginStatus, setLoginStatus] = useState(LoginStatusType.None);
    const { data, updateStreamer } = useContext(StreamerContext);
    const navigate = useNavigate();

    useEffect(() => {
        const login = async () => {
            if (data.acctok === "") {
                if (window.location.hash === "") {
                    window.location.href = `${process.env.REACT_APP_URL_LOGIN}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIR_URI}&response_type=token&scope=chat:read+user:read:email`;
                } else {
                    console.log(window.location.hash);
                    const token = getToken(window.location.hash);
                    const userid = await validateLogin(token);
                    await getUserData(userid, token);
                    setLoginStatus(LoginStatusType.Signed);
                    navigate("/");
                }
            } else {
                setLoginStatus(LoginStatusType.Signed);
            }
        };

        loginStatus === LoginStatusType.None && login();
    }, []);

    const getToken = (hash: string) => {
        return hash.split("&")[0].split("#access_token=")[1];
    };

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

export default useLogin;
