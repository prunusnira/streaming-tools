import React from "react";
import { MiniButton } from "../../../commonStyle/global.style";
import { Phase } from "../../../data/phase";
import { IBanpickData } from "../../main/useBanpickData";
import { PhaseWrapper, Row } from "./phase.style";

type Props = {
    banpickData: IBanpickData;
};

const PhaseIndicator = ({ banpickData }: Props) => {
    const { phase, setPhase } = banpickData;

    return (
        <PhaseWrapper>
            {(function () {
                if (phase === Phase.READY) {
                    return <Row>GET READY</Row>;
                } else {
                    return (
                        <>
                            <Row>{phase === Phase.PICK ? "PICK" : "BAN"} PHASE</Row>
                            <Row>
                                <MiniButton
                                    onClick={() =>
                                        setPhase(phase === Phase.PICK ? Phase.BAN : Phase.PICK)
                                    }
                                >
                                    강제 페이즈 변경
                                </MiniButton>
                            </Row>
                        </>
                    );
                }
            })()}
        </PhaseWrapper>
    );
};

export default PhaseIndicator;
