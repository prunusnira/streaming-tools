import { useEffect, useState } from "react";
import styles from "./TextRoulette.module.css";

type Props = { items: string[]; target: string };

export const TextRoulette = ({ items, target }: Props) => {
    const [index, setIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (!items.length) return;
        const interval = window.setInterval(
            () => setIndex((value) => (value + 1) % items.length),
            85,
        );
        const timeout = window.setTimeout(() => {
            window.clearInterval(interval);
            setFinished(true);
        }, 2800);
        return () => {
            window.clearInterval(interval);
            window.clearTimeout(timeout);
        };
    }, [items]);

    return (
        <section className={styles.stack} aria-live="polite">
            <span className={finished ? styles.result : styles.item}>
                {finished ? target : items[index]}
            </span>
        </section>
    );
};
