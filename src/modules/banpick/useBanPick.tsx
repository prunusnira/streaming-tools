import React, { useContext, useRef, useState } from "react";
import Message from "../../data/message";
import Team from "../../data/team";
import { ModalContext } from "../../context/modalContext";
import { BPButton } from "../../commonStyle/global.style";
import { PopupTitle, PopupBody, PopupFooter } from "../dialog/alertDialog/alertDialog.style";
import BanPickEditor from "./banpickEditor";

type Props = {
    team: Team;
};

const useBanPick = ({ team }: Props) => {
    const [pickList, setPickList] = useState<Array<Message>>(team.pickList);

    const editVal = useRef<string>("");
    const { openDialog, closeDialog } = useContext(ModalContext);

    const editMessage = (msg: Message, idx: number) => {
        openDialog({
            width: "480px",
            maxWidth: 480,
            active: true,
            header: <PopupTitle>내용 수정</PopupTitle>,
            body: (
                <PopupBody>
                    <BanPickEditor
                        msg={msg.msg}
                        setUpdateMsg={(s: string) => {
                            editVal.current = s;
                        }}
                    />
                </PopupBody>
            ),
            footer: (
                <PopupFooter>
                    <BPButton onClick={() => updateText(editVal.current, idx)}>수정</BPButton>
                    <BPButton onClick={() => closeDialog()}>취소</BPButton>
                </PopupFooter>
            ),
        });
    };

    const updateText = (text: string, idx: number) => {
        team.pickList[idx].msg = text;
        editVal.current = "";
        closeDialog();
    };

    const openRemove = (idx: number) => {
        openDialog({
            width: "480px",
            maxWidth: 480,
            active: true,
            header: <PopupTitle>픽 메시지 삭제 확인</PopupTitle>,
            body: <PopupBody>이 메시지를 정말 삭제할까요?</PopupBody>,
            footer: (
                <PopupFooter>
                    <BPButton onClick={() => removeMessage(idx)}>Yes</BPButton>
                    <BPButton onClick={() => closeDialog()}>No</BPButton>
                </PopupFooter>
            ),
        });
    };

    const removeMessage = (idx: number) => {
        team.pickList.splice(idx, 1);
        setPickList(team.pickList);
        closeDialog();
    };

    return {
        pickList,
        editMessage,
        openRemove,
    };
};

export default useBanPick;
