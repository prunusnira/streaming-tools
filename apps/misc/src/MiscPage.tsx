import { Link } from "@tanstack/react-router";
import styles from "@misc/MiscPage.module.css";

export const MiscPage = () => (
    <main className={styles.content}>
        <h1 className={styles.title}>메뉴</h1>
        <p className={styles.description}>사용할 기능을 선택해줘.</p>
        <div className={styles.menuActions}>
            <Link to="/banpick" className={styles.menuCard}>
                <span className={styles.menuTitle}>Ban &amp; Pick</span>
                <span className={styles.menuDescription}>
                    시청자와 함께 팀을 나누고 밴픽을 진행해봐.
                </span>
                <span className={styles.menuAction}>밴픽 열기</span>
            </Link>
            <Link to="/roulette" className={styles.menuCard}>
                <span className={styles.menuTitle}>원형 룰렛</span>
                <span className={styles.menuDescription}>
                    항목과 비율을 설정해 룰렛 추첨을 진행해봐.
                </span>
                <span className={styles.menuAction}>룰렛 열기</span>
            </Link>
        </div>
    </main>
);
