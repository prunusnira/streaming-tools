import React, { Fragment } from 'react';
import { Button, Col, Row } from 'reactstrap';
import './main.css';

interface Props {
    phase: number,
    switchPhase: () => void
}

function PhaseIndicator(props: Props) {
    return (
        <Row className="no-wrap d-flex align-items-center phase">
            {
                (function() {
                    if(props.phase === 0) {
                        return (
                            <Col xs="12" className="no-wrap align-self-center text-center">
                                <span>GET READY</span>
                            </Col>
                        );
                    }
                    else if(props.phase === 1) {
                        return (
                            <Fragment>
                                <Col xs="9" className="no-wrap align-self-center text-center">
                                    <span>PICK PHASE</span>
                                </Col>
                                <Col xs="3" className="no-wrap align-self-center text-center">
                                    <Button
                                        color="dark"
                                        onClick={props.switchPhase}>
                                        강제 페이즈 변경
                                    </Button>
                                </Col>
                            </Fragment>
                        );
                    }
                    else if(props.phase === 2) {
                        return (
                            <Fragment>
                                <Col xs="9" className="no-wrap align-self-center text-center">
                                    <span>BAN PHASE</span>
                                </Col>
                                <Col xs="3" className="no-wrap align-self-center text-center">
                                    <Button
                                        color="dark"
                                        onClick={props.switchPhase}>
                                        강제 페이즈 변경
                                    </Button>
                                </Col>
                            </Fragment>
                        );
                    }
                })()
            }
        </Row>
    );
}

export default PhaseIndicator;