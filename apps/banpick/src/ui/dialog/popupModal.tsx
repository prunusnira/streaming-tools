import { useContext } from "react";
import { cn } from "@streaming-tools/ui";
import { ModalContext } from "../../lib/context/modalProvider";
import styles from "../pref/legacy.module.css";
import Portal from "./portal";

const PopupModal = () => {
    const { data } = useContext(ModalContext);
    return (
        <Portal domid="#dialog">
            <section className={cn(styles.dialogOuter, !data.active && styles.dialogHidden)}>
                <section className={styles.dialogContainer} style={{ width: data.width, maxWidth: data.maxWidth }}>
                    <div className={styles.dialogHeader}>{data.header}</div>
                    <div className={styles.dialogBody}>{data.body}</div>
                    <div className={styles.dialogFooter}>{data.footer}</div>
                </section>
            </section>
        </Portal>
    );
};

export default PopupModal;
