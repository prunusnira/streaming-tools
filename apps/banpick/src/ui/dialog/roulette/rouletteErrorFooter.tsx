import styles from "../../pref/legacy.module.css";

type Props = {
    closeDialog: () => void;
};

const RouletteErrorFooter = ({ closeDialog }: Props) => {
    return <button className={styles.button} onClick={() => closeDialog()}>닫기</button>;
};

export default RouletteErrorFooter;
