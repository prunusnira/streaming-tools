import React from "react";
import { Component } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Message from "../../../data/message";
import Team from "../teamlist/team";

interface Props {
    picklist: Array<Message>,
    msg: Message,
    display: boolean,
    idx: number,
    team: Team,
    close: () => void
}

interface State {
    editText: string
}

class BanPickEditor extends Component<Props, State> {
    state: State = {
        editText: ''
    }

    valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            editText: e.target.value
        });
    }

    updateText = (team: number, text: string, idx: number) => {
        this.editPick(team, text, idx);
        this.setState({
            editText: ''
        });
        this.props.close();
    }

    // 픽 메시지 수정
    editPick = (team: number, val: string, idx: number) => {
        this.props.picklist[idx].setMessage(val);
    }

    render() {
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    내용 수정
                </ModalHeader>
                <ModalBody className="wordwrap">
                    현재 내용: {this.props.msg.getMessage()}<br/>
                    <Input type='text' value={this.state.editText} onChange={this.valueChange} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.updateText(this.props.team.teamNum, this.state.editText, this.props.idx)}>수정</Button>
                    <Button onClick={this.props.close}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BanPickEditor;