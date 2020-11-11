import React from "react";
import { Component } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface Props {
    text: string,
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
    input = React.createRef();

    state: State = {
        editText: this.props.text
    }

    valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            editText: e.target.value
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    내용 수정
                </ModalHeader>
                <ModalBody>
                    <Input type="text" defaultValue={this.state.editText} ref={this.input} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.props.editPick(this.props.team, this.state.editText, this.props.idx)}>수정</Button>
                    <Button onClick={this.props.close}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BanPickEditor;