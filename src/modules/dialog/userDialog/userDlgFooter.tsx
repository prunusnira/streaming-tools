import React from "react";
import { BPButton } from "../../../commonStyle/global.style";
import { DlgFooter } from "./userDlg.style";

type Props = {
    isNego: boolean;
    skipMessage: () => void;
    closeDialog: () => void;
};

const UserDlgFooter = ({ isNego, skipMessage, closeDialog }: Props) => {
    return (
        <DlgFooter>
            {!isNego && <BPButton onClick={() => skipMessage()}>넘기기</BPButton>}
            <BPButton onClick={() => closeDialog()}>닫기</BPButton>
        </DlgFooter>
    );
};

export default UserDlgFooter;
