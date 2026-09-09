import { Button } from "@streaming-tools/ui/components/button";
import type { SavedRoulette } from "../model/roulette";
import styles from "./RouletteSidebar.module.css";

type Props = {
    current: SavedRoulette;
    onDeleteRequested: () => void;
    onNew: () => void;
    onReset: () => void;
    onSelect: (roulette: SavedRoulette) => void;
    saved: SavedRoulette[];
};

export const RouletteSidebar = ({
    current,
    onDeleteRequested,
    onNew,
    onReset,
    onSelect,
    saved,
}: Props) => (
    <aside className={styles.sidebar}>
        <div className={styles.actions}>
            <Button onClick={onNew}>새 룰렛</Button>
            <Button variant="outline" onClick={onReset}>
                현재 초기화
            </Button>
            <Button variant="destructive" onClick={onDeleteRequested}>
                선택한 룰렛 삭제
            </Button>
        </div>
        <h2>저장된 룰렛</h2>
        <ul>
            {saved.map((item) => (
                <li key={item.id}>
                    <button
                        className={item.id === current.id ? styles.selected : ""}
                        onClick={() => onSelect(item)}
                    >
                        {item.title}
                    </button>
                </li>
            ))}
        </ul>
    </aside>
);
