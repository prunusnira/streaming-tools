import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Input, ModalFooter, Button } from "reactstrap";

interface Props {
    display: boolean;
    teamName: string;
    changeTeamName: (name: string) => void;
    close: () => void;
}

const TeamNameChangeDlg = ({ display, teamName, changeTeamName, close }: Props) => {
    const [newName, setNewName] = useState("");
    return (
        <Modal isOpen={display}>
            <ModalHeader>팀 이름 변경</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">현재 팀 이름: {teamName}</Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => changeTeamName(newName)}>변경</Button>
                <Button onClick={() => close()}>취소</Button>
            </ModalFooter>
        </Modal>
    );
};

export default TeamNameChangeDlg;
