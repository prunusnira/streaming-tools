import { useContext, useEffect, useRef } from "react";
import { LoginRequiredAlert } from "@streaming-tools/auth/login-required-alert";
import { Loading } from "@streaming-tools/ui";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { useLogin } from "@banpick/features/streamer/logic/login/useLogin";
import { LoginStatusType } from "@banpick/features/streamer/model/loginStatus";
import { MainPage } from "@banpick/app/MainPage";

export const App = () => {
    const { loginStatus } = useLogin();
    const { openDialog } = useContext(ModalContext);
    const loginAlertOpened = useRef(false);

    useEffect(() => {
        if (loginStatus !== LoginStatusType.NotSigned || loginAlertOpened.current) return;
        loginAlertOpened.current = true;
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: "로그인 필요",
            body: <LoginRequiredAlert />,
            footer: undefined,
        });
    }, [loginStatus, openDialog]);

    switch (loginStatus) {
        case LoginStatusType.Signed:
            return <MainPage />;
        case LoginStatusType.NotSigned:
        case LoginStatusType.None:
        default:
            return <Loading />;
    }
};
