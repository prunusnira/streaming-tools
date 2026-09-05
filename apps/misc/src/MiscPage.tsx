import { Link } from "@tanstack/react-router";
import { Button } from "@streaming-tools/ui";
import styles from "@misc/MiscPage.module.css";

export const MiscPage = () => (
    <main className={styles.content}>
        <h1 className={styles.title}>메뉴</h1>
        <p className={styles.description}>사용할 기능을 선택해줘.</p>
        <Button asChild className={styles.banpickButton}>
            <Link to="/banpick">Banpick 열기</Link>
        </Button>
    </main>
);
