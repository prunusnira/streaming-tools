import React, { Fragment, Component } from "react";
import { Button, Col, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import './config.css';

interface Props {
    pickSize: number,
    banInterval: number,
    banNum: number,
    start: boolean,
    startMethod: () => void,
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
                                            onClick={self.props.startMethod}>시작!</Button>
                                    );
                                }
                                else {
                                    return (
                                        <Button
                                            className="config-btn"
                                            color="primary"
                                            disabled>시작!</Button>
                                    );
                                }
                            })()
                        }
                        <Button
                            className="config-btn"
                            color="warning"
                            onClick={this.props.reset}>
                                리셋
                        </Button>
                        <Button
                            className="config-btn"
                            color="info"
                            onClick={this.props.hideTeamList}>
                                인원 숨기기
                        </Button>
                        <Button
                            className="config-btn"
                            color="info"
                            onClick={this.showHowTo}>
                                사용방법
                        </Button>
                    </Col>
                </Row>
                <Row className="no-wrap selector-wrap d-flex align-items-center">
                    <Col className="text-center no-wrap" xs="4">
                        팀 별 픽 개수
                        <InputGroup>
                            <Button onClick={() => this.props.changePickCount(false)}>-</Button>
                            <Input type="number" value={this.props.pickSize} onClick={this.doNothing} />
                            <Button onClick={() => this.props.changePickCount(true)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col className="text-center no-wrap" xs="4">
                        밴 간격
                        <InputGroup>
                            <Button onClick={() => this.props.changeBanInterval(false)}>-</Button>
                            <Input type="number" value={this.props.banInterval} onClick={this.doNothing} />
                            <Button onClick={() => this.props.changeBanInterval(true)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col className="text-center no-wrap" xs="4">
                        한 번에 밴하는 수
                        <InputGroup>
                            <Button onClick={() => this.props.changeBanCount(false)}>-</Button>
                            <Input type="number" value={this.props.banNum} onClick={this.doNothing} />
                            <Button onClick={() => this.props.changeBanCount(true)}>+</Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Modal isOpen={this.state.howtoOpen}>
                    <ModalHeader>
                        사용 방법
                    </ModalHeader>
                    <ModalBody>
                        1. 스트리머가 [시작] 버튼을 눌러주세요<br/><br/>
                        2. [!팀 1] 혹은 [!팀 2]를 입력하여 선택할 팀을 등록합니다<br/><br/>
                        3. 스트리머가 팀 선택 혹은 전체 선택 버튼을 눌러 시청자를 고릅니다<br/><br/>
                        4. 골라진 사람은 [!픽 내용]을 입력하여 픽 할 내용을 정해주세요<br/><br/>
                        5. 내용 수정이 필요하면 해당 항목에 대해 수정/삭제를 할 수 있습니다<br/><br/>
                        * 앱이 정상적으로 동작하지 않으면 리셋 버튼을 눌러주세요
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