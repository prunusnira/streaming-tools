import { Loading } from "@streaming-tools/ui";
import { useLogin } from "@banpick/features/streamer/logic/login/useLogin";
import { LoginStatusType } from "@banpick/features/streamer/model/loginStatus";
import { MainPage } from "@banpick/app/MainPage";

export const App = () => {
    const { loginStatus } = useLogin();

    switch (loginStatus) {
        case LoginStatusType.Signed:
            return <MainPage />;
        case LoginStatusType.None:
        default:
            return <Loading />;
    }
};
