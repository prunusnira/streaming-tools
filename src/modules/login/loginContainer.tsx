import React, { useEffect } from "react";

const LoginContainer = () => {
    useEffect(() => reqLogin(), []);

    const reqLogin = () => {
        window.location.href = `${process.env.REACT_APP_URL_LOGIN}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIR_URI}&response_type=token&scope=chat:read+user:read:email`;
    };

    return <></>;
};

export default LoginContainer;
