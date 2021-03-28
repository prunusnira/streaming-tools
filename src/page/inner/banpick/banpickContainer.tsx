import React, { Component, Fragment } from "react";
import Message from "../../../data/message";
import User from "../../../data/user";
import Team from "../teamlist/team";
import BanPickEditor from "./banpickEditor";
import BanPickPresenter from "./banpickPresenter";

interface Props {
    picklist: Array<Message>,
    team: Team,
    phase: number,
    currentBanCount: number,
    banNum: number,
    pickCntFix: () => void,
    //banPick: (teamNum: number, idx: number) => void,
    updateBanCount: (banCount: number) => void,
    banOverAlertOpen: (teamName: string, teamNum: number) => void,
    setNego: (callback: () => void) => void,
    getUserSelected: (user: User, teamNum: number) => void,
    phaseChange: () => void
}

interface State {
    editDlg: boolean,
    editMsg: Message,
    editIdx: number
}

class BanPickContainer extends Component<Props, State> {
    state: State = {
        editDlg: false,
        editMsg: new Message("", "", ""),
        editIdx: 0
    }

    setEditMsg = (msg: Message, idx: number) => {
        this.setState({
            editDlg: true,
            editMsg: msg,
            editIdx: idx
        });
    }

    closeEdit = () => {
        this.setState({
            editDlg: false
        });
    }

    // 픽 메시지 삭제
    removePick = (idx: number) => {
        this.props.picklist.splice(idx, 1);
        this.props.team.currentPick--;
        this.props.pickCntFix();
    }

    // 협상테이블 열기
    openNego = (userid: string) => {
        if(this.props.team.hasMember(userid)) {
            this.props.setNego(() => {
                this.props.getUserSelected(
                    this.props.team.getMember(userid)!!,
                    this.props.team.teamNum
                )
            });
        }
    }

    // 밴 or 언밴 하기
    banPick = (idx: number) => {
        let nextBan = this.props.currentBanCount;
        if(this.props.picklist[idx].getBanStatus()) {
            this.props.picklist[idx].undoBan();
            this.props.team.currentBan--;
            nextBan--;
            this.props.updateBanCount(nextBan);
        }
        else {
            // 밴 하기 전에 현재 밴 수 확인
            if(this.props.team.currentBan >= this.props.banNum) {
                // 밴 횟수 초과 상태
                this.props.banOverAlertOpen(
                    this.props.team.name,
                    this.props.team.teamNum
                );
            }
            else {
                this.props.picklist[idx].setBan();
                this.props.team.currentBan++;
                nextBan++;
                this.props.updateBanCount(nextBan);
            }
        }

        // 다음 밴 페이즈 결정
        if(nextBan >= this.props.banNum * 2) {
            // 페이즈를 바꾸고 각 팀의 픽을 초기화
            this.props.phaseChange();
        }
    }

    render() {
        return (
            <Fragment>
                <BanPickPresenter
                    picklist={this.props.picklist}
                    size={this.props.picklist.length}
                    team={this.props.team}
                    phase={this.props.phase}
                    edit={this.setEditMsg}
                    remove={this.removePick}
                    ban={this.banPick}
                    nego={this.openNego} />
                <BanPickEditor
                    picklist={this.props.picklist}
                    msg={this.state.editMsg}
                    display={this.state.editDlg}
                    idx={this.state.editIdx}
                    team={this.props.team}
                    close={this.closeEdit} />
            </Fragment>
        );
    }
}

export default BanPickContainer;