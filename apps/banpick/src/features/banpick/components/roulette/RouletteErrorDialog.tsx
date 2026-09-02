import styles from "./RouletteErrorDialog.module.css";

type Props = {
    content: string;
};

export const RouletteErrorDialog = ({ content }: Props) => {
    return <section className={styles.stack}>{content}</section>;
};
