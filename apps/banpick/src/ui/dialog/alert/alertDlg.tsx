import { ModalType } from "../../../data/modal";
import { AlertContainer, AlertTxt, AlertBtnWrapper, AlertButton } from "./alertDialog.style";

type Props = {
    msg: string;
    btn: string;
    closeDialog: () => void;
    type?: ModalType;
    btnOk?: string;
    ok?: () => void;
};

const AlertDialog = ({ msg, type, btn, btnOk, ok, closeDialog }: Props) => {
    return (
        <AlertContainer>
            <AlertTxt>{msg}</AlertTxt>
            <AlertBtnWrapper>
                {type === ModalType.TwoBtn && <AlertButton onClick={ok}>{btnOk}</AlertButton>}
                <AlertButton onClick={closeDialog}>{btn}</AlertButton>
            </AlertBtnWrapper>
        </AlertContainer>
    );
};

export default AlertDialog;
