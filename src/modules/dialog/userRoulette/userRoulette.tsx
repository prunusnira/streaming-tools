import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

type Params = {
    displayError: boolean;
    message: string;

    displayRoulette: boolean;
    rouletteChildren: React.ReactNode;
};

const UserRoulette = ({ displayError, message, displayRoulette, rouletteChildren }: Params) => {
    return (
        <>
            <Modal isOpen={displayError}>
                <ModalHeader>선택 불가</ModalHeader>
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                    <Button onClick={close}>닫기</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={displayRoulette}>
                <ModalHeader>누구누구!?</ModalHeader>
                <ModalBody
                    data-testid="selectInner"
                    className="text-center"
                    style={{ fontSize: "2em" }}
                >
                    {rouletteChildren}
                </ModalBody>
            </Modal>
        </>
    );
};

export default UserRoulette;
