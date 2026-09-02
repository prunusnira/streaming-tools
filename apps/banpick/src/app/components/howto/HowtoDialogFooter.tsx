import { Button } from "@streaming-tools/ui";
import styles from "./HowtoDialogFooter.module.css";

type Props = {
    closeDialog: () => void;
};

export const HowtoDialogFooter = ({ closeDialog }: Props) => {
    return <Button className={styles.primaryButton} onClick={() => closeDialog()}>닫기</Button>;
};
