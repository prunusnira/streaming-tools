import { type } from "os";
import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import User from "../../../data/user";
import Team from "./team";

type TeamListProps = {
    team: Team,
    hide: boolean,

    open: boolean,
    newname: string,
    isNoUserDlg: boolean,
    isRoulette: boolean,
    msg: string,
    rouletteInner: string,

    openTeamNameChanger: () => void,
    selectUser: () => void,
    changeUserStatePicked: (user: User) => void,
    summonUser: (user: User) => void,
    changeTeamName: (newname: string) => void,
    closeTeamNameChanger: () => void,
    onNameChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
    close: () => void
};

const TeamList: React.FC<TeamListProps> = ({
    team,
    hide,

    open,
    newname,
    isNoUserDlg,
    isRoulette,
    msg,
    rouletteInner,

    openTeamNameChanger,
    selectUser,
    changeUserStatePicked,
    summonUser,
    changeTeamName,
    closeTeamNameChanger,
    onNameChange,
    close
}) => {
    return (
        <Fragment>
            <Card className='teamlist'>
                <CardHeader className="text-center">
                    <Row>
                        <Col xs="12">
                            {team.getName()} ({
                                (function() {
                                    if(hide) {
                                        return "-";
                                    }
                                    else {
                                        return team.getMembers().length;
                                    }
                                })()
                            } 명)
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button
                                style={{width: '100%'}}
                                size="sm"
                                color="dark"
                                onClick={openTeamNameChanger}>
                                    팀명 변경
                            </Button>
                            <Button
                                style={{width: '100%'}}
                                size="sm"
                                color="success"
                                onClick={selectUser}>
                                    이 팀에서 1명 선택
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="rTargetTest">
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="teamlist-body">
                {
                    hide ? 
                        (<Row>
                            <Col xs="12">
                                팀 목록 숨김 상태
                            </Col>
                        </Row>)
                        :
                        (
                            team.getMembers().map(v => {
                                return (
                                    <Row>
                                        <Col xs="12">
                                            <a
                                                href="#none"
                                                className='btn-members'
                                                onMouseOver={(ev) => {
                                                    document.getElementById("sum"+v.getUserId())!.style.display = "block";
                                                }}
                                                onMouseOut={(ev) => {
                                                    document.getElementById("sum"+v.getUserId())!.style.display = "none";
                                                }}>
                                                <span
                                                    onClick={() => changeUserStatePicked(v)}>
                                                    {
                                                        (function() {
                                                            if(v.isPicked()) {
                                                                return (
                                                                    <del>{v.getUserName()}</del>
                                                                );
                                                            }
                                                            else {
                                                                return (
                                                                    v.getUserName()
                                                                );
                                                            }
                                                        })()
                                                    }
                                                </span>
                                                <Button
                                                    style={{display: "none"}}
                                                    id={"sum"+v.getUserId()}
                                                    size="sm"
                                                    color="dark"
                                                    onClick={() => summonUser(v)}>
                                                    강제소환
                                                </Button>
                                            </a>
                                        </Col>
                                    </Row>
                                )
                            })
                        )
                }
                </CardBody>
            </Card>
            <Modal isOpen={open}>
                <ModalHeader>
                    팀 이름 변경
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12">
                            현재 팀 이름: {team.getName()}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Input type="text" value={newname} onChange={onNameChange} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => changeTeamName(newname)}>변경</Button>
                    <Button onClick={closeTeamNameChanger}>취소</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isNoUserDlg}>
                <ModalHeader>
                    선택 불가
                </ModalHeader>
                <ModalBody>
                    {msg}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={close}>닫기</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isRoulette}>
                <ModalHeader>
                    누구누구!?
                </ModalHeader>
                <ModalBody data-testid="selectInner" className="text-center" style={{fontSize: "2em"}}>
                    {rouletteInner}
                </ModalBody>
            </Modal>
        </Fragment>
    );
}

export default TeamList;