import { ErrorCloseBtn } from "./rouletteError.style";

type Props = {
    closeDialog: () => void;
};

const RouletteErrorFooter = ({ closeDialog }: Props) => {
    return <ErrorCloseBtn onClick={() => closeDialog()}>닫기</ErrorCloseBtn>;
};

export default RouletteErrorFooter;
