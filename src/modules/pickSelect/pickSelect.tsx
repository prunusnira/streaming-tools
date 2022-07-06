import React, { Component, Fragment } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Message from "../../data/message";

import "./pickSelect.css";

interface Props {
    onRoulette: boolean;
    pickedMsgDlg: boolean;
    pickedFailMsgDlg: boolean;
    pickedMsg: Message;
    close: () => void;
}

class PickSelect extends Component<Props> {
    render() {
        return (
            <Fragment>
                <Modal isOpen={this.props.pickedMsgDlg}>
                    <ModalHeader>당첨!</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col className="picked-msg text-center" xs="12">
                                {this.props.pickedMsg.getMessage()}
                            </Col>
                        </Row>
                        {this.props.onRoulette ? (
                            ""
                        ) : (
                            <Fragment>
                                <Row>
                                    <Col className="text-center" xs="12">
                                        by {this.props.pickedMsg.getUserName()} (
                                        {this.props.pickedMsg.getUserId()})
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center" xs="12">
                                        at {this.props.pickedMsg.getTime()}
                                    </Col>
                                </Row>
                            </Fragment>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="dark" onClick={this.props.close}>
                            닫기
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.props.pickedFailMsgDlg}>
                    <ModalHeader>아직 픽 항목이 없음</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col className="text-center" xs="12">
                                아직 픽 항목이 없습니다. 밴픽 페이즈를 진행 한 후 수행해주세요
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="dark" onClick={this.props.close}>
                            닫기
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default PickSelect;
