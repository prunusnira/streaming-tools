import { Outlet } from "@tanstack/react-router";
import { Footer, Header } from "@misc";
import styles from "@main/layout/AppLayout.module.css";

export const AppLayout = () => (
    <div className={styles.layout}>
        <Header />
        <div className={styles.content}>
            <Outlet />
        </div>
        <Footer />
    </div>
);
