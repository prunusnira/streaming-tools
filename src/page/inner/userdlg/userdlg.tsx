import React, { Component, Fragment } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Message from "../../../data/message";
import User from "../../../data/user";
import './userdlg.css';

interface Props {
    user: User|null,
    chat: Array<Message>,
    display: boolean,
    close: () => void
}

class UserDialog extends Component<Props> {
    render() {
        const self = this;
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    {
                        (function() {
                            if(self.props.user != null) {
                                return (
                                    <Fragment>
                                        <img
                                            alt="user-profileimg"
                                            className="profile-image"
                                            src={self.props.user.getProfileUrl()} />
                                        &nbsp;
                                        <b>{self.props.user.getUserName()}</b> ({self.props.user.getUserId()})
                                    </Fragment>
                                    
                                );
                            }
                            else return "";
                        })()
                    }
                </ModalHeader>
                <ModalBody id="userchat" className='modelbody-userchat'>
                    {
                        this.props.chat.map(v => {
                            return (
                                <Fragment>
                                    <Row className="no-wrap">
                                        <Col className="msg-time no-wrap" xs="12">
                                            {v.getTime()}
                                        </Col>
                                    </Row>
                                    <Row className="no-wrap msg-row">
                                        <Col className="msg-cont no-wrap" xs="12">
                                            {v.getMessage()}
                                        </Col>
                                    </Row>
                                </Fragment>
                            )
                        })
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.close}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default UserDialog;