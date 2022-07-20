import React from "react";
import { BPButton } from "../../commonStyle/global.style";
import Popup from "../../component/popup";
import { PopupBody, PopupFooter, PopupTitle } from "../dialog/alertDialog/alertDialog.style";

interface Props {
    removeDlg: boolean;
    selected: number;
    removePick: (idx: number) => void;
    close: () => void;
}

export const BanPickRemoveModal = ({ removeDlg, selected, removePick, close }: Props) => {
    return (
        <Popup
            width={"480px"}
            maxWidth={480}
            active={removeDlg}
            header={<PopupTitle>픽 메시지 삭제 확인</PopupTitle>}
            body={<PopupBody>이 메시지를 정말 삭제할까요?</PopupBody>}
            footer={
                <PopupFooter>
                    <BPButton onClick={() => removePick(selected)}>Yes</BPButton>
                    <BPButton onClick={() => close()}>No</BPButton>
                </PopupFooter>
            }
        />
    );
};
