import type { Participant, ParticipantFilter } from "@viewer-picker/model/viewerPicker";
import styles from "./ParticipantPanel.module.css";

type ParticipantPanelProps = {
    filter: ParticipantFilter;
    participants: Participant[];
    visibleParticipants: Participant[];
    onFilterChange: (filter: ParticipantFilter) => void;
    onToggleParticipant: (key: string) => void;
};

export const ParticipantPanel = ({
    filter,
    participants,
    visibleParticipants,
    onFilterChange,
    onToggleParticipant,
}: ParticipantPanelProps) => (
    <section className={styles.panel}>
        <div className={styles.header}>
            <h2>참가자 {participants.length}명</h2>
            <div className={styles.filters}>
                {(
                    [
                        ["all", "전체"],
                        ["selected", "선택됨"],
                        ["unselected", "미선택"],
                    ] as const
                ).map(([value, label]) => (
                    <button
                        aria-pressed={filter === value}
                        className={filter === value ? styles.activeFilter : ""}
                        key={value}
                        type="button"
                        onClick={() => onFilterChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
        {visibleParticipants.length ? (
            <ul className={styles.list}>
                {visibleParticipants.map((participant) => (
                    <li key={participant.key}>
                        <button
                            aria-pressed={participant.isIncluded}
                            className={participant.hasBeenSelected ? styles.previouslySelected : ""}
                            type="button"
                            onClick={() => onToggleParticipant(participant.key)}
                        >
                            {participant.name}
                        </button>
                        <span>{participant.isIncluded ? "추첨 대상" : "제외됨"}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className={styles.empty}>모집을 시작하면 참가자가 여기에 표시돼.</p>
        )}
    </section>
);
