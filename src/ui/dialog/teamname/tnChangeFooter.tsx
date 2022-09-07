import { FooterCloseBtn } from "./tnChange.style";

type Props = {
    closeDialog: () => void;
};

const TNChangeFooter = ({ closeDialog }: Props) => {
    return <FooterCloseBtn onClick={() => closeDialog()}>닫기</FooterCloseBtn>;
};

export default TNChangeFooter;
