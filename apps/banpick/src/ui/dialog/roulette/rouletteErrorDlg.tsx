import { RouletteErrorContainer } from "./rouletteError.style";

type Props = {
    content: string;
};

const RouletteErrorDlg = ({ content }: Props) => {
    return <RouletteErrorContainer>{content}</RouletteErrorContainer>;
};

export default RouletteErrorDlg;
