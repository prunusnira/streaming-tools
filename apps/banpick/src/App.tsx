import { useContext, useEffect, useRef } from "react";
import { AlertDialog, Loading } from "@streaming-tools/ui";
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
            body: (
                <AlertDialog
                    cancelLabel="계정 관리로 이동"
                    message="로그인이 되어 있지 않아. 계정 관리 페이지에서 서비스를 로그인해줘."
                    onCancel={() => window.location.assign("/account")}
                />
            ),
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
