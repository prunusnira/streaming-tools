import type { CSSProperties } from "react";
import { Button } from "@streaming-tools/ui/components/button";
import { getRouletteItemName, type SavedRoulette, type WheelSegment } from "../model/roulette";
import styles from "./RouletteWheel.module.css";

type Props = {
    background: string;
    current: SavedRoulette;
    onSpin: () => void;
    rotation: number;
    segments: WheelSegment[];
    spinDuration: number;
    spinning: boolean;
    winner?: string;
};

export const RouletteWheel = ({
    background,
    current,
    onSpin,
    rotation,
    segments,
    spinDuration,
    spinning,
    winner,
}: Props) => (
    <section className={styles.wheelArea}>
        <h2 className={styles.wheelTitle}>{current.title.trim() || "룰렛"}</h2>
        <div className={styles.pointer} aria-hidden="true" />
        <div
            className={styles.wheel}
            style={
                {
                    "--spin-duration": `${spinDuration}s`,
                    background,
                    transform: `rotate(${rotation}deg)`,
                } as CSSProperties
            }
            aria-label="룰렛 원판"
        >
            {segments.map((segment) => {
                const angle = (segment.start + segment.end) / 2 - 90;
                const radians = (angle * Math.PI) / 180;
                const labelRadius = 32;
                return (
                    <span
                        key={segment.item.id}
                        className={styles.wheelLabel}
                        style={{
                            left: `${50 + Math.cos(radians) * labelRadius}%`,
                            top: `${50 + Math.sin(radians) * labelRadius}%`,
                        }}
                    >
                        {getRouletteItemName(segment.item)}
                    </span>
                );
            })}
        </div>
        <Button size="lg" disabled={!current.items.length || spinning} onClick={onSpin}>
            룰렛 돌리기
        </Button>
        <p aria-live="polite">{winner ? `${winner} 당첨!` : "항목을 추가한 뒤 룰렛을 돌려봐."}</p>
        {segments.length > 0 && (
            <table className={styles.ratioTable}>
                <caption>룰렛 항목별 현재 비율</caption>
                <thead>
                    <tr>
                        <th scope="col">항목</th>
                        <th scope="col">현재 비율</th>
                    </tr>
                </thead>
                <tbody>
                    {segments.map((segment) => (
                        <tr key={segment.item.id} style={{ backgroundColor: segment.color }}>
                            <th scope="row">{getRouletteItemName(segment.item)}</th>
                            <td>{segment.percentage.toFixed(1)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </section>
);
