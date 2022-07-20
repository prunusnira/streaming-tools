import React, { useState } from "react";
import { BPButton } from "../../commonStyle/global.style";
import Popup from "../../component/popup";
import Message from "../../data/message";
import Team from "../../data/team";
import { PopupBody, PopupFooter, PopupTitle } from "../dialog/alertDialog/alertDialog.style";
import { BPEditTxt, BPEditInput } from "./banpick.style";

interface Props {
    team: Team;
    msg: Message;
    display: boolean;
    idx: number;
    close: () => void;
}

const BanPickEditor = ({ team, msg, display, idx, close }: Props) => {
    const [editText, setEditText] = useState("");

    const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    };

    const updateText = (text: string, idx: number) => {
        editPick(text, idx);
        setEditText("");
        close();
    };

    // 픽 메시지 수정
    const editPick = (val: string, idx: number) => {
        team.pickList[idx].msg = val;
    };

    return (
        <Popup
            width={"480px"}
            maxWidth={480}
            active={display}
            header={<PopupTitle>내용 수정</PopupTitle>}
            body={
                <PopupBody>
                    <BPEditTxt>현재 내용: {msg.msg}</BPEditTxt>
                    <BPEditInput type="text" value={editText} onChange={valueChange} />
                </PopupBody>
            }
            footer={
                <PopupFooter>
                    <BPButton onClick={() => updateText(editText, idx)}>수정</BPButton>
                    <BPButton onClick={close}>취소</BPButton>
                </PopupFooter>
            }
        />
    );
};

export default BanPickEditor;
