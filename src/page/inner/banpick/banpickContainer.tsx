import React, { Component, Fragment } from "react";
import Message from "../../../data/message";
import BanPickEditor from "./banpickEditor";
import BanPickPresenter from "./banpickPresenter";

interface Props {
    picklist: Array<Message>,
    teamname: string,
    teamnum: number,
    phase: number,
    editPick: (teamNum: number, val: string, idx: number) => void,
    removePick: (teamNum: number, idx: number) => void,
    banPick: (teamNum: number, idx: number) => void
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

    render() {
        return (
            <Fragment>
                <BanPickPresenter
                    picklist={this.props.picklist}
                    size={this.props.picklist.length}
                    teamname={this.props.teamname}
                    teamnum={this.props.teamnum}
                    phase={this.props.phase}
                    edit={this.setEditMsg}
                    remove={this.props.removePick}
                    ban={this.props.banPick} />
                <BanPickEditor
                    msg={this.state.editMsg}
                    display={this.state.editDlg}
                    idx={this.state.editIdx}
                    team={this.props.teamnum}
                    editPick={this.props.editPick}
                    close={this.closeEdit} />
            </Fragment>
        );
    }
}

export default BanPickContainer;