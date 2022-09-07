import { FooterCloseBtn } from "./howto.style";

type Props = {
    closeDialog: () => void;
};

const HowtoDlgFooter = ({ closeDialog }: Props) => {
    return <FooterCloseBtn onClick={() => closeDialog()}>닫기</FooterCloseBtn>;
};

export default HowtoDlgFooter;
