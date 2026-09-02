import { Button } from "@streaming-tools/ui";
import styles from "./RouletteErrorFooter.module.css";

type Props = {
    closeDialog: () => void;
};

export const RouletteErrorFooter = ({ closeDialog }: Props) => {
    return <Button className={styles.button} onClick={() => closeDialog()}>닫기</Button>;
};
