import useLogin from "./core/login/useLogin";
import { LoginStatusType } from "./data/loginStatus";
import Loading from "./ui/loading/loading";
import MainPage from "./ui/main";

const App = () => {
    const { loginStatus } = useLogin();

    switch (loginStatus) {
        case LoginStatusType.Signed:
            return <MainPage />;
        case LoginStatusType.None:
        default:
            return <Loading />;
    }
};

export default App;
