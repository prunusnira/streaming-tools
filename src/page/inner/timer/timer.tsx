import React, { Component, Fragment, ReactEventHandler } from "react";
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
    }

    startTimer = () => {
        if(!this.state.playing) {
            // 위에서 내려가는 시간
            if(this.time > 0) {
                this.setTimeGoDown();
                this.timerUpDown = true;
            }
            // 0에서 올라가는 시간
            else {
                this.setTimeGoUp();
                this.timerUpDown = false;
            }
    
            this.setState({
                playing: true
            });
        }
        else {
            if(this.state.pause) {
                // resume
                if(this.timerUpDown) {
                    this.setTimeGoDown();
                }
                else {
                    this.setTimeGoUp();
                }
                this.setState({
                    pause: false
                });
            }
            else {
                // pause
                this.stopTimer();
                this.setState({
                    pause: true
                });
            }
        }
    }

    setTimeGoDown = () => {
        this.timerObjectId = setInterval(() => {this.changeTime(false)}, 10);
    }

    setTimeGoUp = () => {
        this.timerObjectId = setInterval(() => {this.changeTime(true)}, 10);
    }

    stopTimer = () => {
        if(this.timerObjectId !== null) {
            clearInterval(this.timerObjectId);
        }
    }

    resetTimer = () => {
        this.stopTimer();
        this.timerObjectId = null;
        this.time = 0;
        this.updateTimer();

        this.setState({
            playing: false,
            pause: false
        });
    }

    changeTime = (up: boolean) => {
        if(up) {
            this.time += 1;
        }
        else {
            this.time -= 1;
            if(this.time <= 0) {
                this.stopTimer();
                this.time = 0;
            }
        }

        this.updateTimer();
    }

    updateTimer = () => {
        const min = this.time / 100 / 60;
        const sec = this.time / 100 % 60;
        const ms = this.time % 100;

        this.setState({
            min: min,
            sec: sec,
            ms: ms
        });
    }

    editMin = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const min = parseInt(ev.target.value);

        this.setState({
            min: min
        }, () => {
            this.time = this.state.min * 60 * 100 + this.state.sec * 100 + this.state.ms;
        });
    }

    editSec = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const sec = parseInt(ev.target.value);

        this.setState({
            sec: sec
        }, () => {
            this.time = this.state.min * 60 * 100 + this.state.sec * 100 + this.state.ms;
        });
    }

    editMs = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const ms = parseInt(ev.target.value);

        this.setState({
            ms: ms
        }, () => {
            this.time = this.state.min * 60 * 100 + this.state.sec * 100 + this.state.ms;
        });
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
                                            <Input min="00" max="99" type="number"
                                                onChange={this.editMin}
                                                value={this.state.min < 10 ? '0'+Math.floor(this.state.min) : Math.floor(this.state.min)} />
                                        </Col>
                                        <Col className="no-wrap" xs="1">
                                            :
                                        </Col>
                                        <Col className="no-wrap" xs="3">
                                            <Input min="00" max="59" type="number"
                                                onChange={this.editSec}
                                                value={this.state.sec < 10 ? '0'+Math.floor(this.state.sec) : Math.floor(this.state.sec)} />
                                        </Col>
                                        <Col className="no-wrap" xs="1">
                                            :
                                        </Col>
                                        <Col className="no-wrap" xs="3">
                                            <Input min="00" max="99" type="number"
                                                onChange={this.editMs}
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
                                    onClick={this.startTimer}>
                                    {
                                        this.state.playing ?
                                            (this.state.pause ? "RESUME" : "PAUSE") : "START"
                                    }
                                </Button>
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