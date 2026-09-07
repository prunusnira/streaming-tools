import { useEffect } from "react";
import { Loading } from "@streaming-tools/ui";
import { useLogin } from "@banpick/features/streamer/logic/login/useLogin";
import { LoginStatusType } from "@banpick/features/streamer/model/loginStatus";
import { MainPage } from "@banpick/app/MainPage";

export const App = () => {
    const { loginStatus } = useLogin();

    useEffect(() => {
        if (loginStatus !== LoginStatusType.NotSigned) return;
        window.alert("로그인이 되어 있지 않아. 계정 관리 페이지에서 서비스를 로그인해줘.");
        window.location.assign("/account");
    }, [loginStatus]);

    switch (loginStatus) {
        case LoginStatusType.Signed:
            return <MainPage />;
        case LoginStatusType.NotSigned:
        case LoginStatusType.None:
        default:
            return <Loading />;
    }
};
