import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@misc/components/Footer.module.css";

export const Footer = () => (
    <footer className={styles.footer}>
        <span>(c) 2020 PrunusNira</span>
        <a
            className={styles.footerLink}
            target="_blank"
            rel="noreferrer"
            href="https://x.com/privatenira"
            aria-label="X에서 privatenira 열기"
        >
            <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a
            className={styles.footerLink}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/prunusnira/streaming-tools"
            aria-label="GitHub에서 streaming-tools 열기"
        >
            <FontAwesomeIcon icon={faGithub} />
        </a>
        <span>minimum width: 1200px</span>
    </footer>
);
