import React, { Component } from "react";
import { Row, Col, Card, CardBody, ButtonGroup, Button, Input } from "reactstrap";

import './timer.css';

interface State {
    min: number;
    sec: number;
    ms: number;
    playing: boolean;
    pause: boolean;
}

class Timer extends Component<{}, State> {
    time: number;
    timerObjectId: NodeJS.Timeout|null;
    timerUpDown: boolean;

    worker: Worker;

    state: State = {
        min: 0,
        sec: 0,
        ms: 0,
        playing: false,
        pause: false
    }

    constructor() {
        super({});
        this.time = 0;
        this.timerObjectId = null;
        this.timerUpDown = false;
        this.worker = new Worker(process.env.PUBLIC_URL+'/timer/timerWorker.js');

        this.worker.onmessage = (ev) => {
            // 시간 받아서 업데이트
            const time = ev.data;
            
            this.setState({
                min: time / 100 / 60,
                sec: time / 100 % 60,
                ms: time % 100
            });
        }
    }

    startTimer = () => {
        this.worker.postMessage('start');
    }

    stopTimer = () => {
        this.worker.postMessage('stop');
    }

    resetTimer = () => {
        this.worker.postMessage('reset');
    }

    editMin = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const min = parseInt(ev.target.value);

        this.setState({
            min: min
        }, () => {
            this.updateTime();
        });
    }

    editSec = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const sec = parseInt(ev.target.value);

        this.setState({
            sec: sec
        }, () => {
            this.updateTime();
        });
    }

    editMs = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const ms = parseInt(ev.target.value);

        this.setState({
            ms: ms
        }, () => {
            this.updateTime();
        });
    }

    updateTime = () => {
        const timeval = this.state.min * 60 * 100 +
                        this.state.sec * 100 +
                        this.state.ms;
        this.worker.postMessage('change '+timeval.toString());
    }

    render() {
        return (
            <Row className="no-wrap overall">
                <Col className="no-wrap" xs="12">
                    <Row className="no-wrap timer-row">
                        <Col className="no-wrap" xs="12">
                            <Card className="timer-body">
                                <CardBody className="no-wrap timer-body">
                                    <Row className="no-wrap">
                                        <Col className="no-wrap" xs="4">
                                            <Input id='timemin' min="00" max="99" type="number" disabled
                                                value={this.state.min < 10 ? '0'+Math.floor(this.state.min) : Math.floor(this.state.min)} />
                                        </Col>
                                        <Col className="no-wrap" xs="1">
                                            :
                                        </Col>
                                        <Col className="no-wrap" xs="3">
                                            <Input id='timesec' min="00" max="59" type="number" disabled
                                                value={this.state.sec < 10 ? '0'+Math.floor(this.state.sec) : Math.floor(this.state.sec)} />
                                        </Col>
                                        <Col className="no-wrap" xs="1">
                                            :
                                        </Col>
                                        <Col className="no-wrap" xs="3">
                                            <Input id='timems' min="00" max="99" type="number" disabled
                                                value={this.state.ms < 10 ? '0'+Math.floor(this.state.ms) : Math.floor(this.state.ms)} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="no-wrap">
                        <Col className="no-wrap" xs="12">
                            <ButtonGroup className="timer-control">
                                <Button size="sm" color="dark"
                                    onClick={this.startTimer}>START</Button>
                                <Button size="sm" color="dark"
                                    onClick={this.stopTimer}>STOP</Button>
                                <Button size="sm" color="dark"
                                    onClick={this.resetTimer}>RESET</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Timer;