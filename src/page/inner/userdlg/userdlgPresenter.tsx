import React, { Component } from "react";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import User from "../../../data/user";
import './userdlg.css';

interface Props {
    user: User|null,
    chat: string[],
    display: boolean,
    close: () => void
}

class UserDlgPresenter extends Component<Props> {
    render() {
        const self = this;
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    {
                        (function() {
                            if(self.props.user != null) {
                                return (
                                    self.props.user.name + "(" + self.props.user.id + ")"
                                );
                            }
                            else return "";
                        })()
                    }
                </ModalHeader>
                <ModalBody className='modelbody-userchat'>
                    {
                        this.props.chat.map(v => {
                            return (
                                <Row>
                                    <Col xs="12">
                                        {v}
                                    </Col>
                                </Row>
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

export default UserDlgPresenter;