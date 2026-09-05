import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BanpickRoot } from "./BanpickRoot";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BanpickRoot />
    </React.StrictMode>,
);
