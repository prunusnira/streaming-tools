import type { CollectionMode } from "@viewer-picker/model/viewerPicker";
import styles from "./RecruitmentControls.module.css";

type RecruitmentControlsProps = {
    collectionMode: CollectionMode;
    hasEligibleParticipant: boolean;
    isDrawing: boolean;
    isRecruiting: boolean;
    participantCount: number;
    prefix: string;
    onCollectionModeChange: (mode: CollectionMode) => void;
    onPick: () => void;
    onPrefixChange: (prefix: string) => void;
    onToggleRecruiting: () => void;
};

export const RecruitmentControls = ({
    collectionMode,
    hasEligibleParticipant,
    isDrawing,
    isRecruiting,
    participantCount,
    prefix,
    onCollectionModeChange,
    onPick,
    onPrefixChange,
    onToggleRecruiting,
}: RecruitmentControlsProps) => (
    <section className={styles.controls} aria-label="모집 설정">
        <div className={styles.modeControls}>
            <label>
                <input
                    checked={collectionMode === "all"}
                    name="collection-mode"
                    type="radio"
                    onChange={() => onCollectionModeChange("all")}
                />
                모든 채팅 참여
            </label>
            <label>
                <input
                    checked={collectionMode === "prefix"}
                    name="collection-mode"
                    type="radio"
                    onChange={() => onCollectionModeChange("prefix")}
                />
                접두어 참여
            </label>
            {collectionMode === "prefix" && (
                <label className={styles.prefixInput}>
                    접두어
                    <input
                        value={prefix}
                        onChange={(event) => onPrefixChange(event.target.value)}
                    />
                </label>
            )}
        </div>
        <button
            className={isRecruiting ? styles.stopButton : ""}
            type="button"
            onClick={onToggleRecruiting}
        >
            {isRecruiting ? "모집 중지" : participantCount ? "모집 재개" : "모집 시작"}
        </button>
        <button type="button" disabled={isDrawing || !hasEligibleParticipant} onClick={onPick}>
            한 명 추첨하기
        </button>
    </section>
);
