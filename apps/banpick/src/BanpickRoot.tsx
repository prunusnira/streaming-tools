import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CombinedProviders from "./lib/context/combinedProvider";
import ModalProvider from "./lib/context/modalProvider";
import StatusProvider from "./lib/context/statusProvider";
import StreamerProvider from "./lib/context/streamerProvider";
import TalkProvider from "./lib/context/talkProvider";
import TeamProvider from "./lib/context/teamProvider";

const BanpickRoot = () => {
    return (
        <BrowserRouter>
            <CombinedProviders
                components={[
                    StreamerProvider,
                    TeamProvider,
                    StatusProvider,
                    ModalProvider,
                    TalkProvider,
                ]}
            >
                <App />
            </CombinedProviders>
        </BrowserRouter>
    );
};

export default BanpickRoot;
