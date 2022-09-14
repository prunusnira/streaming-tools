import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ModalContext } from "../../lib/context/modalProvider";
import AlertDialog from "../dialog/alert/alertDlg";
import { ControlContainer, CtrlRow, Help, NumCtrl, NumText } from "./control.style";

type Props = {
    type: number;
    title: string;
    num: number;
    add: () => void;
    sub: () => void;
};

const Control = ({ type, title, num, add, sub }: Props) => {
    const { openDialog, closeDialog } = useContext(ModalContext);

    const openDescription = (type: number) => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: title,
            body: (
                <AlertDialog
                    btn={"확인"}
                    closeDialog={closeDialog}
                    msg={
                        type === 0
                            ? "각 팀이 수행하는 전체 픽 수입니다. (예: 7이면 모든 페이즈가 끝났을 때 7번씩 픽을 수행하게 됩니다)"
                            : type === 1
                            ? "각 팀이 한 페이즈에 수행할 수 있는 픽 수입니다"
                            : "각 페이즈에서 픽이 끝나고 스트리머가 수행할 수 있는 팀 당 밴의 개수입니다"
                    }
                />
            ),
            footer: undefined,
        });
    };

    return (
        <ControlContainer>
            <CtrlRow>
                {title}&nbsp;
                <Help onClick={() => openDescription(type)}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                </Help>
            </CtrlRow>
            <CtrlRow>
                <NumCtrl onClick={sub}>-</NumCtrl>
                <NumText>{num}</NumText>
                <NumCtrl onClick={add}>+</NumCtrl>
            </CtrlRow>
        </ControlContainer>
    );
};

export default Control;
