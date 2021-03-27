import React, { Component, Fragment } from "react";
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Message from "../../../data/message";
import User from "../../../data/user";
import './userdlg.css';

interface Props {
    nego: boolean,
    team: number,
    user: User|null,
    chat: Array<Message>,
    display: boolean,
    use: (msg: Message) => void,
    skip: () => void,
    close: () => void
}

class UserDialog extends Component<Props> {
    render() {
        const self = this;
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    <Row className="no-wrap">
                        <Col className="no-wrap" xs="12">
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
                                                &nbsp;
                                                {(function() {if(self.props.user.isSubscriber()) return "[구독자]"; else return "";})()}
                                            </Fragment>
                                        );
                                    }
                                    else return "";
                                })()
                            }
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="no-wrap">
                        <Col className="no-wrap userdlg-info text-center" xs="12">
                            {
                                (function() {
                                    if(!self.props.nego) {
                                        return "ⓘ 당첨자는 '!픽 내용' 혹은 '!pick 내용'을 입력하여 픽을 진행할 수 있습니다";
                                    }
                                    else {
                                        return "ⓘ 스트리머와 내용에 대해 협상하세요. 여기서는 !픽 / !pick 을 사용할 수 없습니다";
                                    }
                                })()
                            }
                            
                        </Col>
                    </Row>
                </ModalHeader>
                <ModalBody id="userchat" className='modelbody-userchat'>
                    {
                        this.props.chat.map(v => {
                            return (
                                <Card>
                                    <CardBody>
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
                                        {
                                            (function() {
                                                if(!self.props.nego) {
                                                    return (
                                                        <Row className="no-wrap msg-row">
                                                            <Col className="msg-cont no-wrap" xs="12">
                                                                <Button
                                                                    size="sm"
                                                                    color="dark"
                                                                    onClick={() => self.props.use(v)}>
                                                                    이걸로 결정하기
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    );
                                                }
                                            })()
                                        }
                                    </CardBody>
                                </Card>
                            )
                        })
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.skip}>
                        Skip
                    </Button>
                    <Button onClick={this.props.close}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default UserDialog;