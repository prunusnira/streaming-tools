import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import User from '../../../data/user';
import Team from './team';
import './teamlist.css';

interface Props {
    team: Team,
    totalPickCount: number,
    pickCount: number,
    banInterval: number,
    hide: boolean,
    getUserSelected: (user: User) => void
    changePick: (user: User) => void,
    changeTeamName: (team: number, title: string) => void
}

interface State {
    open: boolean,
    newname: string,
    isNoUserDlg: boolean,
    msg: string
}

class TeamList extends Component<Props> {
    state: State = {
        open: false,
        newname: "",
        isNoUserDlg: false,
        msg: ""
    }

    openTeamNameChanger = () => {
        this.setState({
            open: true
        });
    }

    closeTeamNameChanger = () => {
        this.setState({
            open: false,
            newname: ""
        });
    }

    onNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newname: ev.target.value
        });
    }

    changeTeamName = () => {
        this.props.changeTeamName(this.props.team.teamNum, this.state.newname);
        this.closeTeamNameChanger();
    }

    selectUser = (team: number) => {
        let arr = new Array<User>();
        let partPickOver = false;

        if(this.props.totalPickCount >= this.props.pickCount * 2) {
            this.setState({
                isNoUserDlg: true,
                msg: '전체 픽 페이즈가 종료되었습니다. 결과를 확인해주세요.'
            })
        }
        else {
            if(this.props.team.currentPick >= this.props.banInterval) {
                partPickOver = true;
            }
            else {
                this.props.team.members.map(v => {
                    if(!v.isPicked()) {
                        arr.push(v);
                    }
                });
            }
    
            if(arr.length > 0) {
                // 현재 목록에서 유저 선택
                let randVal = Math.floor(Math.random() * arr.length);
                if(randVal == arr.length) randVal--;
        
                this.props.getUserSelected(arr[randVal]);
            }
            else {
                this.setState({
                    isNoUserDlg: true,
                    msg: partPickOver ? '팀의 현재 페이즈에서 선택 제한을 넘겼습니다' : '팀에 선택할 수 있는 시청자가 없습니다'
                });
            }
        }
    }

    close = () => {
        this.setState({
            isNoUserDlg: false,
            msg: ''
        });
    }

    render () {
        const self = this;
        return (
            <Fragment>
                <Card className='teamlist'>
                    <CardHeader className="text-center">
                        <Row>
                            <Col xs="12">
                                {this.props.team.name} (팀 {this.props.team.teamNum} / {
                                    (function() {
                                        if(self.props.hide) {
                                            return "-";
                                        }
                                        else {
                                            return self.props.team.members.length;
                                        }
                                    })()
                                } 명)
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Button
                                    size="sm"
                                    color="dark"
                                    onClick={this.openTeamNameChanger}>
                                        팀명 변경
                                </Button>
                                <Button
                                    size="sm"
                                    color="dark"
                                    onClick={() => this.selectUser(this.props.team.teamNum)}>
                                        이 팀에서 선택
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="teamlist-body">
                    {
                        this.props.team.members.map(v => {
                            if(self.props.hide) {
                                return (
                                    <Row>
                                        <Col xs="12">
                                            팀 목록 숨김 상태
                                        </Col>
                                    </Row>
                                );
                            }
                            else {
                                if(v.isPicked()) {
                                    return (
                                        <Row>
                                            <Col xs="12">
                                                <Button
                                                    className='btn-members'
                                                    onClick={() => self.props.changePick(v)}>
                                                    <del>{v.getUserName()}</del>
                                                </Button>
                                            </Col>
                                        </Row>
                                    );
                                }
                                else {
                                    return (
                                        <Row>
                                            <Col xs="12">
                                                <Button
                                                    className='btn-members'
                                                    onClick={() => self.props.changePick(v)}>
                                                    {v.getUserName()}
                                                </Button>
                                            </Col>
                                        </Row>
                                    );
                                }
                            }
                        })
                    }
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.open}>
                    <ModalHeader>
                        팀 이름 변경
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                현재 팀 이름: {this.props.team.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Input type="text" value={this.state.newname} onChange={this.onNameChange} />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                       <Button onClick={this.changeTeamName}>변경</Button>
                       <Button onClick={this.closeTeamNameChanger}>취소</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isNoUserDlg}>
                    <ModalHeader>
                        선택 불가
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.close}>닫기</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default TeamList;