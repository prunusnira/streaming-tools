import React from "react";
import PhaseIndicator from "./phase/phase";
import Timer from "./timer/timer";
import { ConfigLayout } from "./config.style";
import Control from "./control/control";
import { IBanpickData } from "../main/useBanpickData";

type Props = {
    banpickData: IBanpickData;
};

const Config = ({ banpickData }: Props) => {
    return (
        <ConfigLayout>
            <Control banpickData={banpickData} />
            <PhaseIndicator banpickData={banpickData} />
            <Timer />
        </ConfigLayout>
    );
};

export default Config;
