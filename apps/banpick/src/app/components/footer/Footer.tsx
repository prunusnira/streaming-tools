import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span>(c) 2020 PrunusNira</span>
            <a className={styles.footerLink} target="_blank" href="https://twitter.com/_nira_one">
                Twitter
            </a>
            <a className={styles.footerLink} target="_blank" href="https://github.com/prunusnira/twitch-banpicker">
                GitHub
            </a>
            <span>minimum width: 1350px</span>
        </footer>
    );
};
