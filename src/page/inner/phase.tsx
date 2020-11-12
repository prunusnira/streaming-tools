import React from 'react';
import { Col, Row } from 'reactstrap';
import './main.css';

interface State {
    phase: number
}

function PhaseIndicator(state: State) {
    return (
        <Row className="no-wrap d-flex align-items-center phase">
            <Col xs="12" className="no-wrap align-self-center text-center">
                {
                    (function() {
                        if(state.phase === 0) {
                            return "PICK PHASE";
                        }
                        else if(state.phase === 1) {
                            return "BAN PHASE";
                        }
                    })()
                }
            </Col>
        </Row>
    );
}

export default PhaseIndicator;