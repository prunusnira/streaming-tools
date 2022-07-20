import React from "react";
import { BPButton } from "../../../commonStyle/global.style";
import Popup from "../../../component/popup";
import { PopupBody, PopupFooter, PopupTitle } from "./alertDialog.style";

type Props = {
    display: boolean;
    title: string;
    body: string;
    btnOK: string;
    setAlertDisplay: (b: boolean) => void;
};

const AlertDialog = ({ display, title, body, btnOK, setAlertDisplay }: Props) => {
    return (
        <Popup
            width={"480px"}
            maxWidth={480}
            active={display}
            header={<PopupTitle>{title}</PopupTitle>}
            body={<PopupBody>{body}</PopupBody>}
            footer={
                <PopupFooter>
                    <BPButton onClick={() => setAlertDisplay(false)}>{btnOK}</BPButton>
                </PopupFooter>
            }
        />
    );
};

export default AlertDialog;
