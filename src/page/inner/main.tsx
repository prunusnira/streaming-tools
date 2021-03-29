import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import Message from '../../data/message';
import { Observer } from '../../data/observer/observer';
import Parser from '../../data/parser';
import TTSPlay from '../../data/tts';
import User from '../../data/user';
import GetUserProfile from '../../data/userProfile';
import { actionCreator } from '../../redux/action';
import { StoreState } from '../../redux/reducer';
import Footer from '../footer/footer';
import Header from '../header/header';
import BanOverAlert from './banoverAlert';
import BanPickContainer from './banpick/banpickContainer';
import ChatPresenter from './chat/chatPresenter';
import Config from './config/config';
import IRCConnect from './irc/ircConnect';

import './main.css';
import PhaseIndicator from './phase';
import PickSelect from './pickSelect/pickSelect';
import Team from './teamlist/team';
import TeamListContainer from './teamlist/teamlistContainer';
import Timer from './timer/timer';
import UserDialog from './userdlg/userdlg';

interface Props {
    acctok: string,
    clientId: string,
    userid: string,
    scopes: Array<string>,
    Actions: typeof actionCreator
}

interface State {
    start: boolean,
    getUsers: boolean,

    // streamer info
    streamer: User,

    team0: Team,
    team1: Team,
    hideTeamList: boolean,

    //pickTeam0: Array<Message>,
    //pickTeam1: Array<Message>,

    currentUser: User|null,
    currentChat: Array<Message>,
    userDlg: boolean,

    pickSize: number,
    banInterval: number,
    banNum: number,

    currentPickCount: number,
    currentBanCount: number,
    currentPhase: number,   // 0: 시작안함, 1: 픽, 2: 밴
    currentNego: boolean,

    totalPickCount: number,
    currentPickedMessage: Message,
    pickedMsgDlg: boolean,
    pickedFailMsgDlg: boolean,
    pickedMsgRoulette: boolean,
    onPickRoulette: boolean,

    banDlg: boolean,
    banDlgTeamName: string,
    banDlgTeamNum: number
}

class MainPage extends Component<Props, State> {
    irc: IRCConnect;
    observer: Observer;
    userProfile: GetUserProfile;
    tts: TTSPlay;
    currentUserLastMessage: Message;
    currentUserSubscribed: boolean;
    currentUserTeam: number;

    state: State = {
        start: false,
        getUsers: false,

        streamer: new User("", "", false),

        team0: new Team(1, "TEAM 1"),
        team1: new Team(2, "TEAM 2"),
        hideTeamList: false,

        //pickTeam0: new Array<Message>(),
        //pickTeam1: new Array<Message>(),

        currentUser: null,
        currentChat: new Array<Message>(),
        userDlg: false,

        pickSize: 7,
        banInterval: 3,
        banNum: 1,

        currentPickCount: 0,
        currentBanCount: 0,
        currentPhase: 0,
        currentNego: false,

        totalPickCount: 0,
        currentPickedMessage: new Message('', '', ''),
        pickedMsgDlg: false,
        pickedFailMsgDlg: false,
        pickedMsgRoulette: false,
        onPickRoulette: false,

        banDlg: false,
        banDlgTeamName: "",
        banDlgTeamNum: 0
    };

    constructor(props: Props) {
        super(props);
        this.start = this.start.bind(this);
        this.switchGetUser = this.switchGetUser.bind(this);
        this.switchPhase = this.switchPhase.bind(this);
        this.reset = this.reset.bind(this);
        this.tokenReset = this.tokenReset.bind(this);
        this.updateTeam = this.updateTeam.bind(this);

        this.observer = new Observer();
        this.irc = new IRCConnect(this.props.acctok, this.props.userid, this.msgProcess);
        this.irc.registerObserver(this.observer);

        this.userProfile = new GetUserProfile();
        this.tts = new TTSPlay();

        this.currentUserLastMessage = new Message('', '', '');
        this.currentUserSubscribed = false;
        this.currentUserTeam = 0;
    }

    componentDidMount = () => {
        this.userProfile.requestUserProfile(
            this.props.userid, this.props.acctok,
            this.props.clientId, this.updateStreamerInfo);
    }

    // componentDidMount
    // 스트리머 정보 업데이트
    updateStreamerInfo = (map: Map<string, string>) => {
        const info = new User(
            this.props.userid, map.get("display_name")!, true
        );
        info.setProfileUrl(map.get("profile_image_url")!);

        this.setState({
           streamer: info 
        });
    }

    // Config
    // 동작 시작
    start = () => {
        this.setState({
            start: true,
            getUsers: true
        });
    }

    // Config
    // 인원 받기/그만받기 변경
    switchGetUser = () => {
        this.setState({
            getUsers: !this.state.getUsers
        });
    }

    // Config
    // 전체 픽 수 설정
    changePickCount = (up: boolean) => {
        if(up) {
            this.setState({
                pickSize: this.state.pickSize + 1
            });
        }
        else {
            if(this.state.pickSize > 0) {
                this.setState({
                    pickSize: this.state.pickSize - 1
                });
            }
        }
    }

    // Config
    // 턴 당 픽 수 설정
    changeBanInterval = (up: boolean) => {
        if(up) {
            this.setState({
                banInterval: this.state.banInterval + 1
            });
        }
        else {
            if(this.state.banInterval > 0) {
                this.setState({
                    banInterval: this.state.banInterval - 1
                });
            }
        }
    }

    // Config
    // 턴 당 밴 수 설정
    changeBanCount = (up: boolean) => {
        if(up) {
            this.setState({
                banNum: this.state.banNum + 1
            });
        }
        else {
            if(this.state.banNum > 0) {
                this.setState({
                    banNum: this.state.banNum - 1
                });
            }
        }
    }

    // Config
    // 리셋
    reset = () => {
        this.setState({start: false,
            team0: new Team(1, "TEAM 1"),
            team1: new Team(2, "TEAM 2"),
            hideTeamList: false,
            //pickTeam0: new Array<Message>(),
            //pickTeam1: new Array<Message>(),
            currentUser: null,
            currentChat: new Array<Message>(),
            userDlg: false,
            pickSize: 5,
            banInterval: 3,
            banNum: 1,
            currentPickCount: 0,
            currentBanCount: 0,
            currentPhase: 0,
            totalPickCount: 0,
            banDlg: false,
            banDlgTeamName: "",
            banDlgTeamNum: 0
        });
    }

    // Header
    // 토큰 리셋
    tokenReset = () => {
        this.props.Actions.removeUserOn();
    }

    // IRC Connect
    // 메시지 처리
    msgProcess = (msg: string) => {
        if(this.state.start) {
            const msgParsed = Parser.parse(msg);
            const map = new Map<string, string>();
    
            if(msgParsed.size > 0) {
                Array.from(msgParsed.keys()).forEach(s => {
                    map.set(s, msgParsed.get(s)!);
                });
    
                // 뱃지 검사해서 subscriber 확인
                const badges = map.get("badges")!.split(",");
                let isSub = false;
                badges.forEach(v => {
                    if(v.startsWith('subscriber')) {
                        isSub = true;
                    }
                });
    
                const team0 = this.state.team0;
                const team1 = this.state.team1;
                let user = null;

                const msg = new Message(map.get("userid")!, map.get("display-name")!, map.get("msg")!);
                
                if(team0.hasMember(msg.getUserId())) {
                    user = team0.getMember(msg.getUserId());
                }
                else if(team1.hasMember(msg.getUserId())) {
                    user = team1.getMember(msg.getUserId());
                }
                else {
                    user = new User(map.get("userid")!, map.get("display-name")!, isSub);
                }
                user!.updateLastMessage(msg);
                
                // 팀 등록
                if(this.state.getUsers && (msg.getMessage().startsWith("!team ") || msg.getMessage().startsWith("!팀 "))) {
                    const teamNum = msg.getMessage().split(" ")[1].split("\r\n")[0];
                    
                    // 이미 다른 팀에 들어가있다면 삭제함
                    if(team0.hasMember(msg.getUserId())) {
                        team0.removeMember(msg.getUserId());
                    }
                    if(team1.hasMember(msg.getUserId())) {
                        team1.removeMember(msg.getUserId());
                    }
    
                    if(teamNum === "1") {
                        console.log(msg.getUserId()+"가 팀 "+teamNum+"으로 등록");
                        team0.addMember(user!);
                    }
                    else if(teamNum === "2") {
                        console.log(msg.getUserId()+"가 팀 "+teamNum+"으로 등록");
                        team1.addMember(user!);
                    }
                    
                    this.setState({
                        team0: team0,
                        team1: team1
                    });
                }
    
                // 픽 등록
                // 검사항목: 현재 유저가 선택된 유저인가
                if(msg.getUserId() === this.state.currentUser?.getUserId()) {
                    if(!this.state.currentNego && (msg.getMessage().startsWith("!pick ") || msg.getMessage().startsWith("!픽 "))) {
                        let nextPick = this.state.currentPickCount;

                        const pickSplited = msg.getMessage().split(" ");
                        let pickMsg = "";
                        for(let i = 1; i < pickSplited.length; i++) {
                            pickMsg += pickSplited[i];
                            if(i !== pickSplited.length - 1) pickMsg += " ";
                        }
        
                        let currentTeam = 0;

                        //const pickTeam0 = this.state.pickTeam0;
                        //const pickTeam1 = this.state.pickTeam1;
                        const team0 = this.state.team0;
                        const team1 = this.state.team1;
                        let totalPick = this.state.totalPickCount;
    
                        if(team0.hasMember(msg.getUserId())) {
                            currentTeam = 1;
                            msg.setMessage(pickMsg);
    
                            // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
                            //pickTeam0.push(msg);
                            team0.addToPickList(msg);
    
                            // 픽 한 유저는 리스트에서 더 사용할 수 없도록 처리함
                            team0.changePickable(msg.getUserId());
                            team0.addCurrentPick();
                            nextPick++;
                        }
                        if(team1.hasMember(msg.getUserId())) {
                            currentTeam = 2;
                            msg.setMessage(pickMsg);
                            //pickTeam1.push(msg);
                            team1.addToPickList(msg);
                            team1.changePickable(msg.getUserId());
                            team1.addCurrentPick();
                            nextPick++;
                        }
        
                        totalPick++;
                        console.log(msg.getUserId()+"(팀"+currentTeam+") MSG: "+pickMsg);
                        this.tts.speech(pickMsg);
    
                        // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
                        let nextPhase = 1;
    
                        if(nextPick >= this.state.banInterval * 2) {
                            nextPhase = 2;
                            nextPick = 0;

                            // 각 팀의 현재 pick도 초기화
                            team0.resetCurrentPick();
                            team1.resetCurrentPick();
                        }

                        console.log("PHASE LOG");
                        console.log(totalPick + " " + nextPick + " " + team0.getCurrentPick() + " " + team1.getCurrentPick() + " " + this.state.banInterval);
                        
                        this.setState({
                            userDlg: false,
                            currentUser: null,
                            currentPickCount: nextPick,
                            currentChat: new Array<Message>(),
                            currentPhase: nextPhase,

                            //pickTeam0: pickTeam0,
                            //pickTeam1: pickTeam1,
                            team0: team0,
                            team1: team1,
                            totalPickCount: totalPick
                        },
                        () => {
                            this.scrollToBottomPick(currentTeam)
                        }
                        );
                    }
                    else {
                        // 메시지 받아서 디스플레이 되도록 추가
                        this.state.currentChat.push(msg);
                        this.setState({});
                        this.scrollToBottomChat();
                        this.tts.speech(msg.getMessage());
                    }
                }
            }
        }
    }

    // UserDialog
    // 해당 메시지를 Pick으로 선택하기
    useMessage = (msg: Message) => {
        let nextPick = this.state.currentPickCount;

        let currentTeam = 0;

        //const pickTeam0 = this.state.pickTeam0;
        //const pickTeam1 = this.state.pickTeam1;
        const team0 = this.state.team0;
        const team1 = this.state.team1;
        let totalPick = this.state.totalPickCount;

        if(team0.hasMember(msg.getUserId())) {
            currentTeam = 1;
            msg.setMessage(msg.getMessage());

            // 팀에 소속되어있다면 해당 팀의 픽 리스트에 등록
            //pickTeam0.push(msg);
            team0.addToPickList(msg);

            // 픽 한 유저는 리스트에서 더 사용할 수 없도록 처리함
            team0.changePickable(msg.getUserId());
            team0.addCurrentPick();
            nextPick++;
        }
        if(team1.hasMember(msg.getUserId())) {
            currentTeam = 2;
            msg.setMessage(msg.getMessage());
            //pickTeam1.push(msg);
            team1.addToPickList(msg);
            team1.changePickable(msg.getUserId());
            team1.addCurrentPick();
            nextPick++;
        }

        totalPick++;
        console.log(msg.getUserId()+"(팀"+currentTeam+") MSG: "+msg.getMessage());
        this.tts.speech(msg.getMessage());

        // 현재 픽 수와 밴 간격을 계산하여 다음 페이즈를 결정
        if(nextPick >= this.state.banInterval * 2) {
            this.phaseChange();
        }

        console.log("PHASE LOG");
        console.log(totalPick + " " + nextPick + " " + team0.getCurrentPick() + " " + team1.getCurrentPick() + " " + this.state.banInterval);
        
        this.setState({
            userDlg: false,
            currentUser: null,
            currentPickCount: nextPick,
            currentChat: new Array<Message>(),

            //pickTeam0: pickTeam0,
            //pickTeam1: pickTeam1,
            team0: team0,
            team1: team1,
            totalPickCount: totalPick
        },
        () => {
            this.scrollToBottomPick(currentTeam)
        }
        );
    }

    // 랜덤으로 유저 선택하기 (callback)
    getUserSelected = (user: User, team: number) => {
        // 해당 유저의 프로필 이미지를 가져오기 위해 유저 정보 불러오기를 수행
        this.currentUserLastMessage = user.getLastMessage();
        this.currentUserSubscribed = user.isSubscriber();
        this.currentUserTeam = team;
        this.userProfile.requestUserProfile(
            user.getUserId(),
            this.props.acctok,
            this.props.clientId,
            this.updateCurrentUser);
    }

    setNego = (callback: () => void) => {
        this.setState({
            currentNego: true
        }, callback);
    }

    notNego = () => {
        this.setState({
            currentNego: false
        });
    }

    // 선택된 유저 정보 갱신
    updateCurrentUser = (map: Map<string, string>) => {
        const user = new User(
            map.get("login")!, map.get("display_name")!, this.currentUserSubscribed
        );
        user.setProfileUrl(map.get("profile_image_url")!);

        console.log("선택된 유저: "+user.getUserName() + " ("+user.getUserId()+")");

        this.tts.speech(user.getUserName());
        this.setState({
            currentUser: user,
            userDlg: true,
            currentPhase: 1,
            currentChat: [this.currentUserLastMessage]
        });
    }

    // 사용자 스킵
    skipUserWindow = () => {
        const uid = this.state.currentUser?.getUserId();
        if(this.state.team0.hasMember(uid!)) {
            this.state.team0.getMember(uid!)?.setPicked();
        }
        else if(this.state.team1.hasMember(uid!)) {
            this.state.team1.getMember(uid!)?.setPicked();
        }

        this.setState({
            userDlg: false,
            currentChat: new Array<Message>(),
            currentUser: null
        });
    }

    // 사용자 상호작용 창 닫기
    closeUserWindow = () => {
        this.setState({
            userDlg: false,
            currentChat: new Array<Message>(),
            currentUser: null
        });
    }

    // 픽 메시지 삭제 후 카운트 1개 줄이기
    pickCntFix = () => {
        this.setState({
            currentPickCount: this.state.currentPickCount-1
        })
    }

    updateBanCount = (banCount: number) => {
        this.setState({
            currentBanCount: banCount
        });
    }

    // 밴 알람 열기
    banOverAlertOpen = (teamName: string, teamNum: number) => {
        this.setState({
            banDlg: true,
            banDlgTeamName: teamName,
            banDlgTeamNum: teamNum
        })
    }

    // 밴 알림 닫기
    banOverAlertClose = () => {
        this.setState({
            banDlg: false
        });
    }

    phaseChange = () => {
        if(this.state.currentPhase == 1) {
            this.state.team0.resetCurrentPick();
            this.state.team1.resetCurrentPick();
            this.setState({
                currentPhase: 2,
                currentPickCount: 0
            });
        }
        else if(this.state.currentPhase == 2) {
            this.state.team0.resetCurrentBan();
            this.state.team1.resetCurrentBan();
            this.setState({
                currentPhase: 1,
                currentBanCount: 0
            });
        }
    }

    updateRoulette = (obj: Object) => {
        console.log(obj);
        this.setState({
            currentPickedMessage: obj as Message
        });
    }

    // PickSelect
    // 당첨 메시지 창 닫기
    closePickedMsgDlg = () => {
        this.setState({
            currentPickedMessage: new Message('', '', ''),
            pickedMsgDlg: false,
            pickedFailMsgDlg: false
        });
    }

    // Phase Indicator
    // 강제 페이즈 변경
    switchPhase = () => {
        if(this.state.currentPhase === 1) {
            this.setState({
                currentPhase: 2,
                currentBanCount: 0
            });
        }
        else if(this.state.currentPhase === 2) {
            this.setState({
                currentPhase: 1,
                currentPickCount: 0
            });
        }
    }

    // 팀 목록 표기
    switchTeamListVisible = () => {
        this.setState({
            hideTeamList: !this.state.hideTeamList
        });
    }

    // 아래로 내리기
    scrollToBottomChat = () => {
        this.setState({}, function() {
            document.getElementById("userchat")!.scrollTop = document.getElementById("userchat")!.scrollHeight;
        });
    }

    scrollToBottomPick = (teamnum: number) => {
        this.setState({}, function() {
            document.getElementById("banpick-box"+teamnum)!.scrollTop = document.getElementById("banpick-box"+teamnum)!.scrollHeight;
        });
    }

    // TeamListContainer
    // 강제로 state 변경
    updateTeam = (team: Team, teamNum: number) => {
        if(teamNum == 1) {
            this.setState({
                team0: team
            });
        }
        else if(teamNum == 2) {
            this.setState({
                team1: team
            });
        }
    }

    // render
    render() {
        return (
            <Fragment>
                <div className="d-flex stretch">
                    <div className="flexwidth-1">
                        <Config
                            pickSize={this.state.pickSize}
                            banInterval={this.state.banInterval}
                            banNum={this.state.banNum}
                            start={this.state.start}
                            getUsers={this.state.getUsers}
                            startMethod={this.start}
                            switchGetUser={this.switchGetUser}
                            changePickCount={this.changePickCount}
                            changeBanInterval={this.changeBanInterval}
                            changeBanCount={this.changeBanCount}
                            reset={this.reset}
                            hideTeamList={this.switchTeamListVisible} />
                        <TeamListContainer
                            key="team0"
                            team={this.state.team0}
                            totalPickCount={this.state.totalPickCount}
                            pickCount={this.state.pickSize}
                            banInterval={this.state.banInterval}
                            hide={this.state.hideTeamList}
                            phase={this.state.currentPhase}
                            getUserSelected={this.getUserSelected}
                            notNego={this.notNego}
                            updateTeam={this.updateTeam} />
                        <TeamListContainer
                            key="team1"
                            team={this.state.team1}
                            totalPickCount={this.state.totalPickCount}
                            pickCount={this.state.pickSize}
                            banInterval={this.state.banInterval}
                            hide={this.state.hideTeamList}
                            phase={this.state.currentPhase}
                            getUserSelected={this.getUserSelected}
                            notNego={this.notNego}
                            updateTeam={this.updateTeam} />
                    </div>
                    <div className="flexwidth-2 d-flex flex-column">
                        <Header
                            streamer={this.state.streamer}
                            tokenReset={this.tokenReset} />
                        <PhaseIndicator
                            phase={this.state.currentPhase}
                            switchPhase={this.switchPhase} />
                        <div className="d-flex banpickbox-height">
                            <div className="banpickbox-width">
                                <BanPickContainer
                                    team={this.state.team0}
                                    phase={this.state.currentPhase}
                                    currentBanCount={this.state.currentBanCount}
                                    banNum={this.state.banNum}
                                    pickCntFix={this.pickCntFix}
                                    //banPick={this.banPick}
                                    updateBanCount={this.updateBanCount}
                                    banOverAlertOpen={this.banOverAlertOpen}
                                    setNego={this.setNego}
                                    getUserSelected={this.getUserSelected}
                                    phaseChange={this.phaseChange} />
                            </div>
                            <div className="banpickbox-width">
                                <BanPickContainer
                                    team={this.state.team1}
                                    phase={this.state.currentPhase}
                                    currentBanCount={this.state.currentBanCount}
                                    banNum={this.state.banNum}
                                    pickCntFix={this.pickCntFix}
                                    //banPick={this.banPick}
                                    updateBanCount={this.updateBanCount}
                                    banOverAlertOpen={this.banOverAlertOpen}
                                    setNego={this.setNego}
                                    getUserSelected={this.getUserSelected}
                                    phaseChange={this.phaseChange} />
                            </div>
                        </div>
                    </div>
                    <div className="flexwidth-3">
                        <Timer />
                        <ChatPresenter
                            username={this.state.streamer.getUserId()} />
                        <Footer />
                    </div>
                </div>
                <UserDialog
                    key="userdialog"
                    nego={this.state.currentNego}
                    team={this.currentUserTeam}
                    user={this.state.currentUser}
                    chat={this.state.currentChat}
                    display={this.state.userDlg}
                    use={this.useMessage}
                    skip={this.skipUserWindow}
                    close={this.closeUserWindow} />
                <BanOverAlert
                    teamName={this.state.banDlgTeamName}
                    teamNum={this.state.banDlgTeamNum}
                    alertOpen={this.state.banDlg}
                    close={this.banOverAlertClose} />
                <PickSelect
                    onRoulette={this.state.onPickRoulette}
                    pickedMsgDlg={this.state.pickedMsgDlg}
                    pickedFailMsgDlg={this.state.pickedFailMsgDlg}
                    pickedMsg={this.state.currentPickedMessage}
                    close={this.closePickedMsgDlg} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        acctok: state.tokenReducer.acctok,
        scopes: state.tokenReducer.scope,
        userid: state.tokenReducer.loginname,
        clientId: state.tokenReducer.clientId
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    Actions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);