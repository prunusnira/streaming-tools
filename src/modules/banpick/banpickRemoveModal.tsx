import React from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

interface Props {
    removeDlg: boolean,
    selected: number,
    removePick: (idx: number) => void,
    close: () => void
}

export const BanPickRemoveModal: React.FC<Props> = ({
    removeDlg,
    selected,
    removePick,
    close
}) => {
    return (
        <Modal isOpen={removeDlg}>
            <ModalHeader>
                픽 메시지 삭제 확인
            </ModalHeader>
            <ModalBody>
                이 메시지를 정말 삭제할까요?
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => removePick(selected)}>
                    Yes
                </Button>
                <Button onClick={() => close()}>
                    No
                </Button>
            </ModalFooter>
        </Modal>
    )
}