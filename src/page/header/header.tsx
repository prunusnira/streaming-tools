import { env } from 'process';
import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import User from '../../data/user';
import './header.css';

interface Props {
    streamer: User,
    tokenReset: () => void
}

interface State {
    howtoOpen: boolean
}

class Header extends Component<Props, State> {
    state: State = {
        howtoOpen: false
    }
    
    showHowTo = () => {
        this.setState({
            howtoOpen: !this.state.howtoOpen
        });
    }

    render() {
        return (
            <header className="header d-flex align-items-center">
                <div className="flex-fill text-center">
                    Twitch BanPicker
                </div>
                <div className="flex-fill text-center">
                    <img
                        alt="streamer-profileimg"
                        className="profile-image"
                        src={this.props.streamer.getProfileUrl()} />
                    &nbsp;
                    <b>{this.props.streamer.getUserName()}</b> ({this.props.streamer.getUserId()})
                </div>
                <div className="flex-fill text-right">
                    <Button
                        color="warning"
                        className="reset-btn no-wrap"
                        onClick={this.showHowTo}>
                        사용방법
                    </Button>
                    <Button
                        color="danger"
                        className="reset-btn no-wrap"
                        onClick={this.props.tokenReset}>
                        로그인 상태 리셋
                    </Button>
                </div>

                <Modal size="xl" isOpen={this.state.howtoOpen}>
                    <ModalHeader>
                        사용 방법
                    </ModalHeader>
                    <ModalBody className="howto-body">
                        <h3>어디에 쓸 수 있나요?</h3>
                        <ul>
                            <li>시청자 참여를 통한 컨텐츠 선택에 사용할 수 있습니다</li>
                            <li>LoL의 밴/픽과 같이 사용자들로부터 컨텐츠를 추천받고, 진행하기 싫은 항목은 밴을 하면 됩니다.</li>
                        </ul>
                        <h3>어떤 방식으로 진행되나요?</h3>
                        <Row className="no-wrap">
                            <Col className="no-wrap" xs="6">
                                <Card>
                                    <CardBody>
                                        <h3>스트리머가 할 일</h3>
                                        <ol>
                                            <li>
                                                전체 픽 수, 턴당 픽/밴 수를 지정합니다 (진행 도중에 변경 가능)
                                            </li>
                                            <li>
                                                <img alt="howto" src={process.env.PUBLIC_URL+"/image/howto/01_start.png"}/>버튼을 눌러 각 팀을 지원 받습니다<br/>
                                                (<img alt="howto" src={process.env.PUBLIC_URL+"/image/howto/05_memstop.png"}/> 혹은&nbsp;
                                                <img alt="howto" src={process.env.PUBLIC_URL+"/image/howto/06_memadd.png"}/> 버튼으로 추가 인원을 받을지를 정할 수 있습니다)
                                            </li>
                                            <li>
                                                <img alt="howto" src={process.env.PUBLIC_URL+"/image/howto/02_teamselect.png"}/>를 눌러 선택할 사람을 고릅니다
                                            </li>
                                            <li>
                                                픽 순서가 끝나면 밴을 합니다<br/>
                                                (픽 된 것중 없었으면 하는걸 지우는 단계)
                                            </li>
                                            <li>
                                                전체 픽이 완료될 때 까지 3~4를 반복합니다
                                            </li>
                                        </ol>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="no-wrap" xs="6">
                                <Card>
                                    <CardBody>
                                        <h3>시청자가 할 일</h3>
                                        <ol>
                                            <li>
                                                스트리머가 <img alt="howto" src={process.env.PUBLIC_URL+"/image/howto/01_start.png"}/> 버튼을 누르면 <b>!팀 1</b> 혹은 <b>!팀 2</b>를 입력하여 팀을 등록합니다.<br/>
                                                (영어로 <b>!team 1</b>, <b>!team 2</b>도 되요)
                                            </li>
                                            <li>
                                                선택된 사용자는 스트리머와 소통하거나 <b>!픽 [내용]</b> 혹은 <b>!pick [내용]</b>으로 픽을 합니다
                                            </li>
                                        </ol>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="no-wrap">
                            <Col className="no-wrap" xs="12">
                                <Card>
                                    <CardBody>
                                        * (부가요소) 밴/픽이 모두 끝나면 <img alt="howto" src={process.env.PUBLIC_URL+"/image/howto/03_pickone.png"}/> 버튼으로 당첨 내용을 골라봅시다<br/>
                                        * 팀원 목록에서 닉네임을 클릭하여 참가 가능 여부를 변경할 수 있습니다<br/>
                                        * 왼쪽 상단의 타이머는 부가적인 기능을 가지고 있지는 않습니다<br/>
                                        &nbsp;&nbsp;시간이 0이면 올라가고 0이 아니면 내려갑니다 (입력/마우스휠로 변경 가능)
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Card>
                            <CardBody>
                                <h4>예시</h4>
                                <b>전체 픽 수 = 5, 1턴당 픽 수 = 3, 1턴당 밴 수 = 1</b><br/><br/>
                                1st PICK → 각 팀당 3명씩 PICK (팀 순서는 상관없습니다)<br/>
                                1st BAN → 각 팀에서 1개씩 BAN<br/>
                                2nd PICK → (전체 픽 수 - 1턴 당 픽수) = 남은 픽 수 2 → 각 팀당 2명 PICK<br/>
                                * 추가 밴을 진행하고 싶으면 <b>강제 페이즈 변경</b> 버튼을 눌러 진행하면 됩니다
                            </CardBody>
                        </Card>
                        * 앱을 다시 사용할 때 정상적으로 동작하지 않으면 <b>계정 토큰 리셋</b> 버튼을 눌러주세요
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.showHowTo}>닫기</Button>
                    </ModalFooter>
                </Modal>
            </header>
        );
    }
}

export default Header;