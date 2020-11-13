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
                    Twitch BanPicker (Beta)
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
                        className="reset-btn"
                        onClick={this.showHowTo}>
                        필독! 사용방법
                    </Button>
                    <Button
                        color="danger"
                        className="reset-btn"
                        onClick={this.props.tokenReset}>
                        계정 토큰 리셋
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
                                                먼저 전체 픽 수, 턴당 픽/밴 개수를 조절합니다
                                            </li>
                                            <li>
                                                <b>시작</b>버튼을 눌러 각 팀을 지원 받습니다
                                            </li>
                                            <li>
                                                <b>인원 그만 받기</b>/<b>인원 더 받기</b> 버튼으로 추가 인원을 받을지 여부를 정할 수 있습니다
                                            </li>
                                            <li>
                                                왼쪽의 각 팀 목록에서 사람을 골라 픽을 받습니다
                                            </li>
                                            <li>
                                                픽 순서가 끝나면 밴을 합니다<br/>
                                                (픽 된 것중 없었으면 하는걸 지우는 단계)
                                            </li>
                                            <li>
                                                전체 픽이 완료될 때 까지 반복합니다
                                            </li>
                                        </ol>
                                        * (부가요소) 밴/픽이 모두 끝나면 <b>하나 고르기</b> 버튼으로 당첨 내용을 골라봅시다
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className="no-wrap" xs="6">
                                <Card>
                                    <CardBody>
                                        <h3>시청자가 할 일</h3>
                                        <ol>
                                            <li>
                                                스트리머가 시작 버튼을 누르면 <b>!팀 1</b> 혹은 <b>!팀 2</b>를 입력하여 팀을 등록합니다.<br/>
                                                영어로 <b>!team 1</b>, <b>!team 2</b>도 되요
                                            </li>
                                            <li>
                                                선택된 사용자는 스트리머와 소통하거나 <b>!픽 [내용]</b> 혹은 <b>!pick [내용]</b>으로 픽을 합니다
                                            </li>
                                        </ol>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Card>
                            <CardBody>
                                <h4>예시를 들어볼게요</h4>
                                <b>전체 픽 수 = 5, 1턴당 픽 수 = 3, 1턴당 밴 수 = 1</b> 이라면?<br/><br/>
                                1. 첫 PICK PHASE에서 각 팀당 3명씩 골라서 픽을 합니다 (팀 순서는 상관없습니다)<br/>
                                2. 스트리머가 각 팀에서 1개씩 BAN을 합니다<br/>
                                3. 이제 (전체 픽 수 - 1턴 당 픽수) = 2 이므로 각 팀당 2명을 더 뽑아서 픽을 합니다<br/>
                                4. 끝!<br/><br/>
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