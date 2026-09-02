import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { CombinedProviders } from "@banpick/app/providers/CombinedProviders";
import { ModalProvider } from "@banpick/shared/modal/ModalProvider";
import { StatusProvider } from "@banpick/features/banpick/model/StatusProvider";
import { StreamerProvider } from "@banpick/features/streamer/model/StreamerProvider";
import { TalkProvider } from "@banpick/features/chat/model/TalkProvider";
import { TeamProvider } from "@banpick/features/banpick/model/TeamProvider";

export const BanpickRoot = () => {
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
