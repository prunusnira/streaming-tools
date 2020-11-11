import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Message from '../../data/message';
import { Observer } from '../../data/observer/observer';
import Parser from '../../data/parser';
import User from '../../data/user';
import { actionCreator } from '../../redux/action';
import { StoreState } from '../../redux/reducer';
import Footer from '../footer/footer';
import Header from '../header/header';
import BanPickContainer from './banpick/banpickContainer';
import ChatContainer from './chat/chatContainer';
import IRCConnect from './irc/ircConnect';

import './main.css';
import Team from './teamlist/team';
import TeamListContainer from './teamlist/teamlistContainer';
import UserDlgContainer from './userdlg/userdlgContainer';
import UserSelector from './userSelector';

interface Props {
    acctok: string,
    clientId: string,
    loginName: string,
    scopes: Array<string>,
    Actions: typeof actionCreator
}

interface State {
    team0: Team,
    team1: Team,

    pickSize: number,
    pickTeam0: Array<string>,
    pickTeam1: Array<string>,

    currentUser: User|null,
    currentChat: string[],
    userDlg: boolean
}

class MainPage extends Component<Props, State> {
    irc: IRCConnect;
    observer: Observer;

    state: State = {
        team0: new Team(1),
        team1: new Team(2),
        pickSize: 5,
        pickTeam0: new Array<string>(),
        pickTeam1: new Array<string>(),
        currentUser: null,
        currentChat: new Array<string>(),
        userDlg: false
    };

    constructor(props: Props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.observer = new Observer();
        this.irc = new IRCConnect(this.props.acctok, this.props.loginName, this.msgProcess);
        this.irc.registerObserver(this.observer);
    }

    reset = () => {
        this.props.Actions.removeUserOn();
    }

    msgProcess = (msg: string) => {
        const msgParsed = Parser.parse(msg);
        const map = new Map<string, string>();

        if(msgParsed.size > 0) {
            Array.from(msgParsed.keys()).forEach(s => {
                map.set(s, msgParsed.get(s)!);
            });

            const user = new User(map.get("userid")!, map.get("nickname")!);
            const msg = new Message(map.get("userid")!, map.get("msg")!);

            console.log(msg.id+ " " +msg.msg);

            // 팀 등록
            if(msg.msg.startsWith("!team ") || msg.msg.startsWith("!팀 ")) {
                const teamNum = msg.msg.split(" ")[1].split("\r\n")[0];

                // 이미 다른 팀에 들어가있다면 삭제함
                if(this.state.team0.hasMember(msg.id)) {
                    this.state.team0.removeMember(msg.id);
                }
                if(this.state.team1.hasMember(msg.id)) {
                    this.state.team1.removeMember(msg.id);
                }

                if(teamNum === "1") {
                    console.log(msg.id+"가 팀 "+teamNum+"으로 등록");
                    this.state.team0.addMember(user);
                }
                else if(teamNum === "2") {
                    console.log(msg.id+"가 팀 "+teamNum+"으로 등록");
                    this.state.team1.addMember(user);
                }
                this.setState({});
            }

            // 픽 등록
            // 검사항목: 현재 유저가 선택된 유저인가
            if(msg.id === this.state.currentUser?.id) {
                if(msg.msg.startsWith("!pick ") || msg.msg.startsWith("!픽 ")) {
                    const pickSplited = msg.msg.split(" ");
                    let pickMsg = "";
                    for(let i = 1; i < pickSplited.length; i++) {
                        pickMsg += pickSplited[i];
                        if(i != pickSplited.length - 1) pickMsg += " ";
                    }
    
                    let currentTeam = 0;
                    if(this.state.team0.hasMember(msg.id)) {
                        currentTeam = 1;
                    }
                    if(this.state.team1.hasMember(msg.id)) {
                        currentTeam = 2;
                    }
    
                    console.log(msg.id+"(팀"+currentTeam+") MSG: "+pickMsg);
    
                    // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
                    if(currentTeam === 1) {
                        this.state.pickTeam0.push(pickMsg);
                    }
                    if(currentTeam === 2) {
                        this.state.pickTeam1.push(pickMsg);
                    }
    
                    this.setState({
                        userDlg: false,
                        currentUser: null
                    });
                }
                else {
                    // 메시지 받아소 디스플레이 되도록 추가
                    this.state.currentChat.push(msg.msg);
                    this.setState({});
                }
            }
        }
    }

    // 랜덤으로 유저 선택하기 (callback)
    getUserSelected = (user: User) => {
        // 유저 등록 및 다이얼로그 열기
        console.log("선택된 유저: "+user.name);
        this.setState({
            currentUser: user,
            userDlg: true
        });
    }

    closeUserWindow = () => {
        this.setState({
            userDlg: false,
            currentUser: null
        });
    }

    editPick = (team: number, val: string, idx: number) => {
        if(team === 1) {
            this.state.pickTeam0[idx] = val;
        }
        else if(team === 2) {
            this.state.pickTeam1[idx] = val;
        }
        
        this.setState({});
    }

    removePick = (team: number, idx: number) => {
        if(team === 1) {
            this.setState({
                pickTeam0: this.state.pickTeam0.splice(idx, 1)
            });
        }
        else if(team === 2) {
            this.setState({
                pickTeam1: this.state.pickTeam1.splice(idx, 1)
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Header
                    loginName={this.props.loginName} />
                <Container fluid className="mainContainer overallContainer">
                    <div className="divleft-overall">
                        <Fragment>
                            <TeamListContainer team={this.state.team0} />
                            <TeamListContainer team={this.state.team1} />
                            <UserSelector
                                teamOneMembers={this.state.team0.members}
                                teamTwoMembers={this.state.team1.members}
                                getUserSelected={this.getUserSelected} />
                        </Fragment>
                        <br/>
                        <Button onClick={this.reset}>
                            RESET
                        </Button>
                    </div>
                    <div className="divright-overall">
                        <ChatContainer />
                    </div>
                    <div>
                        <Row>
                            <Col className="text-center" xs="12">
                                How to use
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                1. [!팀 1] 혹은 [!팀 2]를 입력하여 선택할 팀을 등록한다<br/>
                                2. 스트리머가 팀 선택 혹은 전체 선택 버튼을 눌러 시청자를 고른다<br/>
                                3. 골라진 사람은 [!픽 내용]을 입력하여 픽 할 내용을 정한다
                            </Col>
                        </Row>
                        <Row>
                            <div className="divleft-banpick">
                                <BanPickContainer
                                    picklist={this.state.pickTeam0}
                                    teamnum={1}
                                    editPick={this.editPick}
                                    removePick={this.removePick} />
                            </div>
                            <div className="divright-banpick">
                                <BanPickContainer
                                    picklist={this.state.pickTeam1}
                                    teamnum={2}
                                    editPick={this.editPick}
                                    removePick={this.removePick} />
                            </div>
                        </Row>
                    </div>
                    <UserDlgContainer
                        user={this.state.currentUser}
                        chat={this.state.currentChat}
                        display={this.state.userDlg}
                        close={this.closeUserWindow} />
                </Container>
                <Footer />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        acctok: state.tokenReducer.acctok,
        scopes: state.tokenReducer.scope,
        loginName: state.tokenReducer.loginname,
        clientId: state.tokenReducer.clientId
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    Actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);