import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StreamerProvider from "./lib/context/streamerProvider";
import { BrowserRouter } from "react-router-dom";
import CombinedProviders from "./lib/context/combinedProvider";
import TeamProvider from "./lib/context/teamProvider";
import StatusProvider from "./lib/context/statusProvider";
import ModalProvider from "./lib/context/modalProvider";
import TalkProvider from "./lib/context/talkProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
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
    </React.StrictMode>
);
