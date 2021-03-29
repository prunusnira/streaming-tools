import React, { Fragment, Component } from "react";
import { Button, Col, Input, InputGroup, Row } from "reactstrap";
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

class Config extends Component<Props> {
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
                                            className="config-btn config-btn-big"
                                            color="primary"
                                            onClick={self.props.startMethod}>시작</Button>
                                    );
                                }
                                else if(self.props.start && self.props.getUsers) {
                                    return (
                                        <Button
                                            className="config-btn config-btn-big"
                                            color="primary"
                                            onClick={self.props.switchGetUser}>인원 그만 받기</Button>
                                    );
                                }
                                else if(self.props.start && !self.props.getUsers) {
                                    return (
                                        <Button
                                            className="config-btn config-btn-big"
                                            color="primary"
                                            onClick={self.props.switchGetUser}>인원 더 받기</Button>
                                    );
                                }
                            })()
                        }
                        <Button
                            className="config-btn config-btn-normal"
                            size="sm"
                            color="danger"
                            onClick={this.props.reset}>
                                리셋
                        </Button>
                        <Button
                            className="config-btn config-btn-normal"
                            size="sm"
                            color="dark"
                            onClick={this.props.hideTeamList}>
                                팀원표시
                        </Button>
                    </Col>
                </Row>
                <Row className="no-wrap selector-wrap d-flex align-items-center">
                    <Col className="text-center no-wrap" xs="4">
                        팀 전체 픽
                        <InputGroup>
                            <Button size="sm" color="dark" onClick={() => this.props.changePickCount(false)}>-</Button>
                            <Input type="number" value={this.props.pickSize} onChange={this.doNothing} />
                            <Button size="sm" color="dark" onClick={() => this.props.changePickCount(true)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col className="text-center no-wrap" xs="4">
                        턴당 픽
                        <InputGroup>
                            <Button size="sm" color="dark" onClick={() => this.props.changeBanInterval(false)}>-</Button>
                            <Input type="number" value={this.props.banInterval} onChange={this.doNothing} />
                            <Button size="sm" color="dark" onClick={() => this.props.changeBanInterval(true)}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col className="text-center no-wrap" xs="4">
                        턴당 밴
                        <InputGroup>
                            <Button size="sm" color="dark" onClick={() => this.props.changeBanCount(false)}>-</Button>
                            <Input type="number" value={this.props.banNum} onChange={this.doNothing} />
                            <Button size="sm" color="dark" onClick={() => this.props.changeBanCount(true)}>+</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Config;