import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Button, Container } from 'reactstrap';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { Observer } from '../../data/observer/observer';
import Parser from '../../data/parser';
import { actionCreator } from '../../redux/action';
import { StoreState } from '../../redux/reducer';
import ChatContainer from './chat/chatContainer';
import IRCConnect from './irc/ircConnect';

import './main.css';
import Team from './teamlist/team';
import TeamListContainer from './teamlist/teamlistContainer';

interface Props {
    acctok: string,
    clientId: string,
    loginName: string,
    scopes: Array<string>,
    Actions: typeof actionCreator
}

interface State {
    teamOne: Team,
    teamTwo: Team
}

class MainPage extends Component<Props, State> {
    irc: IRCConnect;
    observer: Observer;

    state: State = {
        teamOne: new Team(1),
        teamTwo: new Team(2)
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

        if(msgParsed.size > 0) {
            Array.from(msgParsed.keys()).forEach(s => {
                console.log(s+": "+msgParsed.get(s));
            });
        }
    }

    render() {
        return (
            <Container className="mainContainer">
                <div className="divleft">
                    <Fragment>
                        <TeamListContainer teamNum={1} />
                        <TeamListContainer teamNum={2} />
                    </Fragment>
                    왼쪽에는 나누어진 팀 목록을 표시함

                    LEFT HERE<br/>
                    CID: {this.props.clientId}<br/>
                    NAME: {this.props.loginName}<br/>
                    SCOPES: <br/>
                    {
                        this.props.scopes.map(
                            (v) => {
                                return v;
                            }
                        )
                    }
                    <br/>
                    <Button onClick={this.reset}>
                        RESET
                    </Button>
                </div>
                <div className="divright">
                    <ChatContainer />
                </div>
                <div>
                    가운데에 밴픽 창을 표시
                </div>
            </Container>
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