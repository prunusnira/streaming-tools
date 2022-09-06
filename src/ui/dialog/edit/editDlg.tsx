import { useState } from "react";
import { Message } from "../../../data/message";
import {
    EditBtnWrapper,
    EditButton,
    EditDlgContainer,
    EditExistChunk,
    EditInput,
    ExistTitle,
    ExistTxt,
} from "./editDlg.style";

type Props = {
    teamNum: number;
    idx: number;
    msg: Message;
    editText: (teamNum: number, idx: number, text: string) => void;
    closeDialog: () => void;
};

const EditDlg = ({ teamNum, idx, msg, editText, closeDialog: closeTalkDlg }: Props) => {
    const [text, setText] = useState("");

    return (
        <EditDlgContainer>
            <EditExistChunk>
                <ExistTitle>현재 내용:</ExistTitle>
                <ExistTxt>{msg.msg}</ExistTxt>
            </EditExistChunk>
            <EditExistChunk>
                <ExistTitle>변경 내용:</ExistTitle>
                <EditInput value={text} onChange={(e) => setText(e.target.value)} />
            </EditExistChunk>
            <EditBtnWrapper>
                <EditButton onClick={closeTalkDlg}>취소</EditButton>
                <EditButton onClick={() => editText(teamNum, idx, text)}>수정</EditButton>
            </EditBtnWrapper>
        </EditDlgContainer>
    );
};

export default EditDlg;
