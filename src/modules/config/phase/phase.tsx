import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import { Phase } from "../../../data/phase";
import { changePhase } from "../../../redux/banpickSlice";
import { RootState } from "../../../redux/reducer";
import { PhaseWrapper } from "./phase.style";

const PhaseIndicator = () => {
    const { phase } = useSelector((state: RootState) => state.banpick);
    const dispatch = useDispatch();

    return (
        <PhaseWrapper>
            {(function () {
                if (phase === Phase.READY) {
                    return (
                        <Col xs="12" className="no-wrap align-self-center text-center">
                            <span>GET READY</span>
                        </Col>
                    );
                } else {
                    return (
                        <>
                            <Col xs="9" className="no-wrap align-self-center text-center">
                                <span>{phase === Phase.PICK ? "PICK" : "BAN"} PHASE</span>
                            </Col>
                            <Col xs="3" className="no-wrap align-self-center text-center">
                                <Button
                                    color="dark"
                                    onClick={() =>
                                        dispatch({
                                            type: changePhase,
                                            payload: phase === Phase.PICK ? Phase.BAN : Phase.PICK,
                                        })
                                    }
                                >
                                    강제 페이즈 변경
                                </Button>
                            </Col>
                        </>
                    );
                }
            })()}
        </PhaseWrapper>
    );
};

export default PhaseIndicator;
