import styles from "../../pref/legacy.module.css";

type Props = {
    content: string;
};

const RouletteErrorDlg = ({ content }: Props) => {
    return <section className={styles.stack}>{content}</section>;
};

export default RouletteErrorDlg;
