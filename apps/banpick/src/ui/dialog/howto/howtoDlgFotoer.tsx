import styles from "../../pref/legacy.module.css";

type Props = {
    closeDialog: () => void;
};

const HowtoDlgFooter = ({ closeDialog }: Props) => {
    return <button className={styles.primaryButton} onClick={() => closeDialog()}>닫기</button>;
};

export default HowtoDlgFooter;
