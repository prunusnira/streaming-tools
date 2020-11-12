import React from "react";
import { Component } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Message from "../../../data/message";

interface Props {
    msg: Message,
    display: boolean,
    idx: number,
    team: number,
    editPick: (teamNum: number, val: string, idx: number) => void,
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
        this.props.editPick(team, text, idx);
        this.setState({
            editText: ''
        });
        this.props.close();
    }

    render() {
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    내용 수정
                </ModalHeader>
                <ModalBody>
                    현재 내용: {this.props.msg.getMessage()}<br/>
                    <Input type='text' value={this.state.editText} onChange={this.valueChange} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.updateText(this.props.team, this.state.editText, this.props.idx)}>수정</Button>
                    <Button onClick={this.props.close}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BanPickEditor;