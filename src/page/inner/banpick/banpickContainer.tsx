import React, { Component, Fragment } from "react";
import BanPickEditor from "./banpickEditor";
import BanPickPresenter from "./banpickPresenter";

interface Props {
    picklist: string[],
    teamnum: number,
    editPick: (teamNum: number, val: string, idx: number) => void,
    removePick: (teamNum: number, idx: number) => void
}

interface State {
    editDlg: boolean,
    editText: string,
    editIdx: number
}

class BanPickContainer extends Component<Props, State> {
    state: State = {
        editDlg: false,
        editText: "",
        editIdx: 0
    }

    setEditMsg = (text: string, idx: number) => {
        console.log(idx+" "+text);
        this.setState({
            editDlg: true,
            editText: text,
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
                    teamnum={this.props.teamnum}
                    edit={this.setEditMsg}
                    remove={this.props.removePick} />
                <BanPickEditor
                    text={this.state.editText}
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