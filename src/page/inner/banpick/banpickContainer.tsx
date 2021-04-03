import React, { Component, Fragment } from "react";
import Message from "../../../data/message";
import User from "../../../data/user";
import Team from "../teamlist/team";
import BanPickEditor from "./banpickEditor";
import BanPickPresenter from "./banpickPresenter";
import { BanPickRemoveModal } from "./banpickRemoveModal";

interface Props {
    team: Team,
    phase: number,
    banNum: number,
    banOverAlertOpen: (teamName: string, teamNum: number) => void,
    setNego: (callback: () => void) => void,
    getUserSelected: (user: User, teamNum: number) => void,
    phaseChange: () => void
}

interface State {
    editDlg: boolean,
    editMsg: Message,
    editIdx: number,
    removeDlg: boolean,
    removeIdx: number
}

class BanPickContainer extends Component<Props, State> {
    state: State = {
        editDlg: false,
        editMsg: new Message("", "", ""),
        editIdx: 0,
        removeDlg: false,
        removeIdx: -1
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
        this.props.team.removeFromPickList(idx);
        this.closeRemove();
    }

    openRemovalPickModal = (idx: number) => {
        this.setState({
            removeDlg: true,
            removeIdx: idx
        });
    }

    closeRemove = () => {
        this.setState({
            removeDlg: false,
            removeIdx: -1
        });
    }

    // 협상테이블 열기
    openNego = (userid: string) => {
        if(this.props.team.hasMember(userid)) {
            this.props.setNego(() => {
                this.props.getUserSelected(
                    this.props.team.getMember(userid)!!,
                    this.props.team.getTeamNum()
                )
            });
        }
    }

    // 밴 or 언밴 하기
    banPick = (idx: number) => {
        if(this.props.team.getOnePick(idx).getBanStatus()) {
            this.props.team.getOnePick(idx).undoBan();
            this.props.team.removeCurrentBan();
        }
        else {
            // 밴 하기 전에 현재 밴 수 확인
            if(this.props.team.getCurrentBan() >= this.props.banNum) {
                // 밴 횟수 초과 상태
                this.props.banOverAlertOpen(
                    this.props.team.getName(),
                    this.props.team.getTeamNum()
                );
            }
            else {
                this.props.team.getOnePick(idx).setBan();
                this.props.team.addCurrentBan();
            }
        }

        // 다음 페이즈 결정
        this.props.phaseChange();
    }

    render() {
        return (
            <Fragment>
                <BanPickPresenter
                    team={this.props.team}
                    phase={this.props.phase}
                    edit={this.setEditMsg}
                    openRemove={this.openRemovalPickModal}
                    ban={this.banPick}
                    nego={this.openNego} />
                <BanPickEditor
                    team={this.props.team}
                    msg={this.state.editMsg}
                    display={this.state.editDlg}
                    idx={this.state.editIdx}
                    close={this.closeEdit} />
                <BanPickRemoveModal
                    removeDlg={this.state.removeDlg}
                    selected={this.state.removeIdx}
                    removePick={this.removePick}
                    close={this.closeRemove} />
            </Fragment>
        );
    }
}

export default BanPickContainer;