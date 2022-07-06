import React from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import Message from "../../../data/message";
import User from "../../../data/user";
import "./userdlg.css";

interface Props {
    nego: boolean;
    team: number;
    user: User;
    chat: Array<Message>;
    display: boolean;
    use: (msg: Message) => void;
    skip: (user: User) => void;
    close: () => void;
}

const UserDialog = ({ team, user, nego, chat, display, use, skip, close }: Props) => {
    if (user.getUserId() === "") return;
    return (
        <Modal isOpen={display}>
            <ModalHeader>
                <Row className="no-wrap">
                    <Col className="no-wrap" xs="12">
                        <img
                            alt="user-profileimg"
                            className="profile-image"
                            src={user.getProfileUrl()}
                        />
                        &nbsp;
                        <b>{user.getUserName()}</b> ({user.getUserId()}) &nbsp;
                        {(function () {
                            if (user.isSubscriber()) return "[구독자]";
                            else return "";
                        })()}
                    </Col>
                </Row>
                <hr />
                <Row className="no-wrap">
                    <Col className="no-wrap userdlg-info text-center" xs="12">
                        {(function () {
                            if (!nego) {
                                return "ⓘ 당첨자는 '!픽 내용' 혹은 '!pick 내용'을 입력하여 픽을 진행할 수 있습니다";
                            } else {
                                return "ⓘ 스트리머와 내용에 대해 협상하세요. 여기서는 !픽 / !pick 을 사용할 수 없습니다";
                            }
                        })()}
                    </Col>
                </Row>
            </ModalHeader>
            <ModalBody id="userchat" className="modelbody-userchat">
                {chat.map((v) => {
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
                                {(function () {
                                    if (!nego) {
                                        return (
                                            <Row className="no-wrap msg-row">
                                                <Col className="msg-cont no-wrap" xs="12">
                                                    <Button
                                                        size="sm"
                                                        color="dark"
                                                        onClick={() => use(v)}
                                                    >
                                                        이걸로 결정하기
                                                    </Button>
                                                </Col>
                                            </Row>
                                        );
                                    }
                                })()}
                            </CardBody>
                        </Card>
                    );
                })}
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => skip(user)}>Skip</Button>
                <Button onClick={() => close()}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default UserDialog;
