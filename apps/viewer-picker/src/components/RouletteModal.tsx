import { TextRoulette } from "@streaming-tools/roulette";
import type { Participant } from "@viewer-picker/model/viewerPicker";
import styles from "./RouletteModal.module.css";

type RouletteModalProps = { items: string[]; participant: Participant };

export const RouletteModal = ({ items, participant }: RouletteModalProps) => (
    <div className={styles.backdrop} role="presentation">
        <section aria-label="추첨 중" className={styles.modal} role="dialog">
            <h2>참여자 추첨 중</h2>
            <TextRoulette items={items} target={participant.name} />
        </section>
    </div>
);
