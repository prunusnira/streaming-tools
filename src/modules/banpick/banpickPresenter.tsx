import React from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Card, CardBody, Col, Row } from "reactstrap";
import Message from "../../data/message";
import { RootState } from "../../redux/reducer";

import "./banpick.css";
import { BanPickWrapper, BanPickTitle, BanPickBody } from "./banpick.style";

interface Props {
    pickList: Array<Message>;
    teamName: string;
    teamNum: number;
    edit: (msg: Message, idx: number) => void;
    openRemove: (idx: number) => void;
    ban: (idx: number) => void;
    nego: (userid: string) => void;
}

const BanPickPresenter = ({ pickList, teamName, teamNum, edit, openRemove, ban, nego }: Props) => {
    const { phase } = useSelector((state: RootState) => state.banpick);

    return (
        <BanPickWrapper>
            <BanPickTitle>
                {teamName} (팀 {teamNum})
            </BanPickTitle>
            <BanPickBody id={`banpick-box${teamNum}`} className="banpicklist-body">
                {pickList.map((v, i) => {
                    return (
                        <Card>
                            <CardBody className="banpick-box">
                                <Row className="no-wrap">
                                    <Col className="no-wrap" xs="10">
                                        <Row>
                                            <Col xs="12">PICK {i + 1}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="banpick-content" xs="12">
                                                {(function () {
                                                    if (v.ban) {
                                                        return <del>{v.msg}</del>;
                                                    } else {
                                                        return v.msg;
                                                    }
                                                })()}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12">
                                                {v.time} by {v.name} ({v.id})
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="no-wrap" xs="2">
                                        <Row className="no-wrap">
                                            <Col className="no-wrap" xs="12">
                                                <ButtonGroup vertical className="banpick-btngroup">
                                                    <Button
                                                        className="banpick-btn"
                                                        size="sm"
                                                        color="dark"
                                                        onClick={() => edit(v, i)}
                                                    >
                                                        수정
                                                    </Button>
                                                    <Button
                                                        className="banpick-btn"
                                                        size="sm"
                                                        color="dark"
                                                        onClick={() => openRemove(i)}
                                                    >
                                                        삭제
                                                    </Button>
                                                    {(function () {
                                                        if (phase === 1 && v.ban) {
                                                            return (
                                                                <Button
                                                                    className="banpick-btn"
                                                                    size="sm"
                                                                    color="dark"
                                                                    disabled
                                                                >
                                                                    언밴
                                                                </Button>
                                                            );
                                                        } else if (phase === 1 && !v.ban) {
                                                            return (
                                                                <Button
                                                                    className="banpick-btn"
                                                                    size="sm"
                                                                    color="dark"
                                                                    disabled
                                                                >
                                                                    밴
                                                                </Button>
                                                            );
                                                        } else if (phase === 2 && v.ban) {
                                                            return (
                                                                <Button
                                                                    className="banpick-btn"
                                                                    size="sm"
                                                                    color="dark"
                                                                    onClick={() => ban(i)}
                                                                >
                                                                    언밴
                                                                </Button>
                                                            );
                                                        } else if (phase === 2 && !v.ban) {
                                                            return (
                                                                <Button
                                                                    className="banpick-btn"
                                                                    size="sm"
                                                                    color="dark"
                                                                    onClick={() => ban(i)}
                                                                >
                                                                    밴
                                                                </Button>
                                                            );
                                                        }
                                                    })()}
                                                    <Button
                                                        className="banpick-btn"
                                                        size="sm"
                                                        color="dark"
                                                        onClick={() => nego(v.id)}
                                                    >
                                                        협테
                                                    </Button>
                                                </ButtonGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    );
                })}
            </BanPickBody>
        </BanPickWrapper>
    );
};

export default BanPickPresenter;
