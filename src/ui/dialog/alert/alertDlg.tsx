import { AlertContainer, AlertTxt, AlertBtnWrapper, AlertButton } from "./alertDialog.style";

type Props = {
    msg: string;
    closeDialog: () => void;
};

const AlertDialog = ({ msg, closeDialog }: Props) => {
    return (
        <AlertContainer>
            <AlertTxt>{msg}</AlertTxt>
            <AlertBtnWrapper>
                <AlertButton onClick={closeDialog}>닫기</AlertButton>
            </AlertBtnWrapper>
        </AlertContainer>
    );
};

export default AlertDialog;
