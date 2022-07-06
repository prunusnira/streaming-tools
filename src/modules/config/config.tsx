import React from "react";
import PhaseIndicator from "./phase/phase";
import Timer from "./timer/timer";
import { ConfigLayout } from "./config.style";
import Control from "./control/control";

const Config = () => {
    return (
        <ConfigLayout>
            <Control />
            <PhaseIndicator />
            <Timer />
        </ConfigLayout>
    );
};

export default Config;
