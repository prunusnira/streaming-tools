import React, { Fragment, Component } from "react";
import { Button, Col, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import './config.css';

interface Props {
    pickSize: number,
    banInterval: number,
    banNum: number,
    start: boolean,
    getUsers: boolean,
    startMethod: () => void,
    switchGetUser: () => void,
    changePickCount: (up: boolean) => void,
    changeBanInterval: (up: boolean) => void,
    changeBanCount: (up: boolean) => void,
    reset: () => void,
    hideTeamList: () => void
}

interface State {
    howtoOpen: boolean
}

class Config extends Component<Props, State> {
    state: State = {
        howtoOpen: false
    }

    showHowTo = () => {
        this.setState({
            howtoOpen: !this.state.howtoOpen
        });
    }

    doNothing = () => {

    }

    render() {
        const self = this;
        return (
            <Fragment>
                <Row className="no-wrap config-btn-wrap">
                    <Col className="text-center no-wrap config-btn-wrap" xs="12">
                        {
                            (function() {
                                if(!self.props.start) {
                                    return (
                                        <Button
                                            className="config-btn"
                                            color="primary"
                                            onClick={self.props.startMethod}>시작</Button>
                                    );
                                }
                                else if(self.props.start && self.props.getUsers) {
                                    return (
                                        <Button
                                            className="config-btn"
                                            color="primary"
                                            onClick={self.props.switchGetUser}>인원 그만 받기</Button>
                                    );
                                }
                                else if(self.props.start && !self.props.getUsers) {
                                    return (
                                        <Button
                                            className="config-btn"
                                            color="primary"
                                            onClick={self.props.switchGetUser}>인원 더 받기</Button>
                                    );
                                }
                            })()
                        }
                        <Button
                            className="config-btn"
                            color="dark"
                            onClick={this.showHowTo}>
                                사용방법
                        </Button>
                        <Button
                            className="config-btn"
                            color="warning"
                            onClick={this.props.reset}>
                                리셋
                        </Button>
                        <Button
                            className="config-btn"
                            color="dark"
                            onClick={this.props.hideTeamList}>
                                팀원 가리기/표시
                        </Button>
                    </Col>
                </Row>
                <Row className="no-wrap selector-wrap d-flex align-items-center">
                    <Col className="text-center no-wrap" xs="4">
                        팀 별 픽 개수
                        <InputGroup>
                            <Button disabled={this.props.start} onClick={() => this.props.changePickCount(false)}>-</Button>
                            <Input disabled={this.props.start} type="number" value={this.props.pickSize} onClick={this.doNothing} />
                            <Button disabled={this.props.start} onClick={() => this.props.changePickCount(true)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col className="text-center no-wrap" xs="4">
                        밴 간격
                        <InputGroup>
                            <Button disabled={this.props.start} onClick={() => this.props.changeBanInterval(false)}>-</Button>
                            <Input disabled={this.props.start} type="number" value={this.props.banInterval} onClick={this.doNothing} />
                            <Button disabled={this.props.start} onClick={() => this.props.changeBanInterval(true)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col className="text-center no-wrap" xs="4">
                        한 번에 밴하는 수
                        <InputGroup>
                            <Button disabled={this.props.start} onClick={() => this.props.changeBanCount(false)}>-</Button>
                            <Input disabled={this.props.start} type="number" value={this.props.banNum} onClick={this.doNothing} />
                            <Button disabled={this.props.start} onClick={() => this.props.changeBanCount(true)}>+</Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Modal isOpen={this.state.howtoOpen}>
                    <ModalHeader>
                        사용 방법
                    </ModalHeader>
                    <ModalBody>
                        <h3>시작하기</h3>
                        <ul>
                            <li>시작하기 전에 <b>각 팀 별 픽 개수</b>, <b>밴 페이즈 까지의 픽 개수</b>, <b>밴 페이즈에서 각 팀의 밴 개수</b>를 정합니다</li>
                            <li>스트리머가 <b>시작!</b> 버튼을 눌러 시작합니다</li>
                        </ul>
                        <h3>팀 등록</h3>
                        <ul>
                            <li>
                                시작이 눌러지면, 시청자들은 <b>!팀 1</b> 혹은 <b>!팀 2</b>를 입력하여 선택할 팀을 등록합니다<br/>
                                (영문으로 <b>!team 1</b> 혹은 <b>!team 2</b>도 가능합니다)
                            </li>
                        </ul>
                        <h3>픽 페이즈</h3>
                        <ul>
                            <li>스트리머가 <b>이 팀에서 선택</b> 버튼을 누르면 그 팀에서 랜덤으로 한 명이 선택됩니다</li>
                            <li>선택된 유저는 채팅으로 스트리머와 소통하거나, <b>!픽 [내용]</b> 혹은 <b>!pick [내용]</b>을 입력하여 원하는 내용을 등록합니다</li>
                            <li>스트리머가 원한다면 내용을 수정하거나 삭제할 수 있습니다</li>
                        </ul>
                        <h3>밴 페이즈</h3>
                        <ul>
                            <li>스트리머가 미리 지정한 각 팀의 밴 개수 만큼 밴을 수행합니다</li>
                        </ul>
                        <h5>* 앱을 다시 사용할 때 정상적으로 동작하지 않으면 <b>계정 토큰 리셋</b> 버튼을 눌러주세요</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.showHowTo}>닫기</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

export default Config;