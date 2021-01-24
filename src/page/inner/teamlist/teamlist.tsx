import React, { Component, Fragment } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Roulette from '../../../data/roulette';
import User from '../../../data/user';
import Team from './team';
import './teamlist.css';

interface Props {
    team: Team,
    totalPickCount: number,
    pickCount: number,
    banInterval: number,
    hide: boolean,
    phase: number,
    getUserSelected: (user: User, team: number) => void
    changePick: (user: User) => void,
    changeTeamName: (team: number, title: string) => void,
    notNego: () => void
}

interface State {
    open: boolean,
    newname: string,
    isNoUserDlg: boolean,
    isRoulette: boolean,
    msg: string,
    rouletteInner: string
}

class TeamList extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.selectUser = this.selectUser.bind(this);
    }

    state: State = {
        open: false,
        newname: "",
        isNoUserDlg: false,
        isRoulette: false,
        msg: "",
        rouletteInner: ""
    }

    componentDidUpdate = () => {
        if(this.props.team.rouletteInit) {
            this.selectUser(this.props.team.teamNum);
        }
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
        this.props.team.rouletteInit = false;

        if(this.props.phase === 2) {
            this.setState({
                isNoUserDlg: true,
                msg: '밴 페이즈가 진행중입니다. 밴을 수행하거나 강제 페이즈 변경을 해주세요'
            });
            return;
        }

        if(this.props.totalPickCount >= this.props.pickCount * 2) {
            this.setState({
                isNoUserDlg: true,
                msg: '전체 픽 페이즈가 종료되었습니다. 결과를 확인해주세요.'
            });
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
                this.setState({
                    isRoulette: true
                },
                () => {
                    // 현재 목록에서 유저 선택
                    let randVal = Math.floor(Math.random() * arr.length);
                    if(randVal == arr.length) randVal--;
    
                    // 룰렛 선택 표기
                    const roulette = new Roulette(
                        arr,
                        false);
                    
                    roulette.setupPos(randVal);
                    roulette.start();
                    roulette.roulette(this.updateRoulette);
                    roulette.stop((obj: Object) => {
                        this.updateRoulette(arr[randVal]);

                        this.props.notNego();
                        this.props.getUserSelected(arr[randVal], team);
                        setTimeout(this.closeRoulette, 1000);
                    }, 3);
                });
            }
            else {
                this.setState({
                    isNoUserDlg: true,
                    msg: partPickOver ? '팀의 현재 페이즈에서 선택 제한을 넘겼습니다' : '팀에 선택할 수 있는 시청자가 없습니다'
                });
            }
        }
    }

    updateRoulette = (obj: Object) => {
        this.setState({
            rouletteInner: (obj as User).getUserName()
        });
    }

    close = () => {
        this.setState({
            isNoUserDlg: false,
            msg: ''
        });
    }

    closeRoulette = () => {
        this.setState({
            isRoulette: false
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
                            </Col>
                        </Row>
                        <Row>
                            <Col id="rTargetTest">
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="teamlist-body">
                    {
                        self.props.hide ? 
                            (<Row>
                                <Col xs="12">
                                    팀 목록 숨김 상태
                                </Col>
                            </Row>)
                            :
                            self.props.team.members.map(v => {
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
                <Modal isOpen={this.state.isRoulette}>
                    <ModalHeader>
                        누구누구!?
                    </ModalHeader>
                    <ModalBody className="text-center" style={{fontSize: "2em"}}>
                        {this.state.rouletteInner}
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default TeamList;