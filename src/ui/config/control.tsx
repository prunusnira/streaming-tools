import { ControlContainer, CtrlRow, NumCtrl, NumText } from "./control.style";

type Props = {
    title: string;
    num: number;
    add: () => void;
    sub: () => void;
};

const Control = ({ title, num, add, sub }: Props) => {
    return (
        <ControlContainer>
            <CtrlRow>{title}</CtrlRow>
            <CtrlRow>
                <NumCtrl onClick={sub}>-</NumCtrl>
                <NumText>{num}</NumText>
                <NumCtrl onClick={add}>+</NumCtrl>
            </CtrlRow>
        </ControlContainer>
    );
};

export default Control;
