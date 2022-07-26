import React, { useState } from "react";
import { PopupBody } from "../dialog/alertDialog/alertDialog.style";
import { BPEditTxt, BPEditInput } from "./banpick.style";

interface Props {
    msg: string;
    setUpdateMsg: (s: string) => void;
}

const BanPickEditor = ({ msg, setUpdateMsg }: Props) => {
    const [editText, setEditText] = useState("");

    return (
        <PopupBody>
            <BPEditTxt>현재 내용: {msg}</BPEditTxt>
            <BPEditInput
                type="text"
                value={editText}
                onChange={(e) => {
                    setEditText(e.target.value);
                    setUpdateMsg(e.target.value);
                }}
            />
        </PopupBody>
    );
};

export default BanPickEditor;
