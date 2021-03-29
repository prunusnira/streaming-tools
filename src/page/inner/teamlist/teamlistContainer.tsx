import React, { Component } from 'react';
import Roulette from '../../../data/roulette';
import User from '../../../data/user';
import Team from './team';
import TeamList from './teamlist';
import './teamlist.css';

interface Props {
    team: Team,
    totalPickCount: number,
    pickCount: number,
    banInterval: number,
    hide: boolean,
    phase: number,
    getUserSelected: (user: User, team: number) => void,
    notNego: () => void,
    updateTeam: (team: Team, teamNum: number) => void
}

interface State {
    open: boolean,
    newname: string,
    isNoUserDlg: boolean,
    isRoulette: boolean,
    msg: string,
    rouletteInner: string
}

class TeamListContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.selectUser = this.selectUser.bind(this);
    }

    state: State = {
        open: false,
        newname: "",
        isNoUserDlg: false,
        isRoulette: false,
        msg: "",
        rouletteInner: ""
    }

    componentDidUpdate = () => {
        /*if(this.props.team.rouletteInit) {
            this.selectUser(this.props.team.teamNum);
        }*/
    }

    // 유저 픽 가능 유무 변경
    changeUserStatePicked = (user: User) => {
        const team = this.props.team;

        if(team.hasMember(user.getUserId())) {
            team.changePickable(user.getUserId());
        }
        
        this.props.updateTeam(team, team.getTeamNum());
    }

    // 팀 이름 변경
    changeTeamName = (title: string) => {
        const team = this.props.team;
        team.setName(title);
        this.props.updateTeam(team, team.getTeamNum());
        this.closeTeamNameChanger();
    }

    // 유저 강제 소환
    summonUser = (user: User) => {
        this.props.getUserSelected(user, this.props.team.getTeamNum());
    }



    openTeamNameChanger = () => {
        this.setState({
            open: true
        });
    }

    closeTeamNameChanger = () => {
        this.setState({
            open: false,
            newname: ""
        });
    }

    onNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newname: ev.target.value
        });
    }

    selectUser = () => {
        let arr = new Array<User>();
        let partPickOver = false;

        if(this.props.phase === 2) {
            this.setState({
                isNoUserDlg: true,
                msg: '밴 페이즈가 진행중입니다. 밴을 수행하거나 강제 페이즈 변경을 해주세요'
            });
            return;
        }

        if(this.props.totalPickCount >= this.props.pickCount * 2) {
            this.setState({
                isNoUserDlg: true,
                msg: '전체 픽 페이즈가 종료되었습니다. 결과를 확인해주세요.'
            });
        }
        else {
            if(this.props.team.getCurrentPick() >= this.props.banInterval) {
                partPickOver = true;
            }
            else {
                this.props.team.getMembers().map(v => {
                    if(!v.isPicked()) {
                        arr.push(v);
                    }
                });
            }
    
            if(arr.length > 0) {
                this.setState({
                    isRoulette: true
                },
                () => {
                    // 현재 목록에서 유저 선택
                    let randVal = Math.floor(Math.random() * arr.length);
                    if(randVal == arr.length) randVal--;
    
                    // 룰렛 선택 표기
                    const roulette = new Roulette(
                        arr,
                        false);
                    
                    roulette.setupPos(randVal);
                    roulette.start();
                    roulette.roulette(this.updateRoulette);
                    roulette.stop((obj: Object) => {
                        this.updateRoulette(arr[randVal]);

                        this.props.notNego();
                        this.props.getUserSelected(arr[randVal], this.props.team.getTeamNum());
                        setTimeout(this.closeRoulette, 1000);
                    }, 3);
                });
            }
            else {
                this.setState({
                    isNoUserDlg: true,
                    msg: partPickOver ? '팀의 현재 페이즈에서 선택 제한을 넘겼습니다' : '팀에 선택할 수 있는 시청자가 없습니다'
                });
            }
        }
    }

    updateRoulette = (obj: Object) => {
        this.setState({
            rouletteInner: (obj as User).getUserName()
        });
    }

    close = () => {
        this.setState({
            isNoUserDlg: false,
            msg: ''
        });
    }

    closeRoulette = () => {
        this.setState({
            isRoulette: false
        });
    }

    render () {
        const self = this;
        return (
            <TeamList
                team={this.props.team}
                hide={this.props.hide}

                open={this.state.open}
                newname={this.state.newname}
                isNoUserDlg={this.state.isNoUserDlg}
                isRoulette={this.state.isRoulette}
                msg={this.state.msg}
                rouletteInner={this.state.rouletteInner}

                openTeamNameChanger={this.openTeamNameChanger}
                selectUser={this.selectUser}
                changeUserStatePicked={this.changeUserStatePicked}
                summonUser={this.summonUser}
                changeTeamName={this.changeTeamName}
                closeTeamNameChanger={this.closeTeamNameChanger}
                onNameChange={this.onNameChange}
                close={this.close}
            />
        );
    }
}

export default TeamListContainer;