import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import MainPage from "./main/main";

import LoginContainer from "./login/loginContainer";
import ValidContainer from "./login/validContainer";

const IndexContainer = () => {
    const { user } = useSelector((state: RootState) => state);

    useEffect(() => {
        console.log("start");
        console.log(user.acctok);
    }, []);

    // redux의 시간 데이터 확인
    if (user.acctok !== "") {
        return <MainPage />;
    } else if (window.location.hash === "") {
        return <LoginContainer />;
    } else {
        return <ValidContainer hash={window.location.hash} />;
    }
};

export default IndexContainer;
