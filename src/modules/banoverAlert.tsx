import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface Props {
    teamName: string;
    teamNum: number;
    alertOpen: boolean;
    close: () => void;
}

const BanOverAlert = (props: Props) => {
    return (
        <Modal isOpen={props.alertOpen}>
            <ModalHeader>밴 횟수 초과</ModalHeader>
            <ModalBody>
                이번 턴에서 {props.teamName} (팀 {props.teamNum})에 대해 수행할 수 있는 밴 횟수를
                초과했습니다
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.close}>닫기</Button>
            </ModalFooter>
        </Modal>
    );
};

export default BanOverAlert;
