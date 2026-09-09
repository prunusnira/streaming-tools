import type { ReactNode } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@streaming-tools/ui/components/button";
import {
    convertRouletteWeightMode,
    type RouletteInputMode,
    type RouletteWeightMode,
    type SavedRoulette,
} from "../model/roulette";
import styles from "./RouletteOptions.module.css";

type Props = {
    chatMode: boolean;
    chatPanel?: ReactNode;
    connected: boolean;
    current: SavedRoulette;
    external: boolean;
    onAddItem: () => void;
    onOpenDonationSettings: () => void;
    onSelectMode: (mode: RouletteInputMode) => void;
    onToggleExternalInput: () => void;
    onUpdate: (next: Partial<SavedRoulette>) => void;
    spinDuration: number;
};

export const RouletteOptions = ({
    chatMode,
    chatPanel,
    connected,
    current,
    external,
    onAddItem,
    onOpenDonationSettings,
    onSelectMode,
    onToggleExternalInput,
    onUpdate,
    spinDuration,
}: Props) => (
    <section className={styles.editor}>
        <div className={styles.optionControls}>
            <label>
                룰렛 제목
                <input
                    value={current.title}
                    onChange={(event) => onUpdate({ title: event.target.value })}
                />
            </label>
            <div className={`${styles.actions} ${styles.modeActions}`}>
                {(["manual", "chat", "donation"] as RouletteInputMode[]).map((mode) => (
                    <Button
                        key={mode}
                        variant={current.inputMode === mode ? "primary" : "outline"}
                        onClick={() => onSelectMode(mode)}
                    >
                        {mode === "manual"
                            ? "연동 없음"
                            : mode === "chat"
                              ? "채팅 연동"
                              : "후원 연동"}
                    </Button>
                ))}
                {external && (
                    <div className={styles.autoAddStatus}>
                        <span className={styles.autoAddState}>
                            자동 추가{" "}
                            <strong className={connected ? styles.stateOn : styles.stateOff}>
                                {connected ? "켜짐" : "꺼짐"}
                            </strong>
                        </span>
                        <Button
                            variant={connected ? "outline" : "primary"}
                            aria-label={
                                connected ? "아이템 자동 추가 끄기" : "아이템 자동 추가 켜기"
                            }
                            onClick={onToggleExternalInput}
                        >
                            {connected ? "끄기" : "켜기"}
                        </Button>
                    </div>
                )}
            </div>
            {external && (
                <p className={styles.helper}>
                    {chatMode ? (
                        <>
                            정수 가중치로 고정돼. 채팅에서 <code>!추가 항목이름</code>을 입력하면
                            추가되고, 같은 항목은 가중치가 1 증가해.
                        </>
                    ) : (
                        <>
                            정수 가중치로 고정돼. 후원 이벤트 API가 연결되면{" "}
                            <code>!추가 항목이름</code> 규칙으로 반영해.
                        </>
                    )}
                </p>
            )}
            {current.inputMode === "donation" && (
                <Button variant="outline" onClick={onOpenDonationSettings}>
                    후원 금액 구간 설정
                </Button>
            )}
            <label className={styles.weightMode}>
                비율 방식
                <select
                    value={current.weightMode}
                    disabled={external}
                    onChange={(event) =>
                        onUpdate({
                            items: convertRouletteWeightMode(
                                current.items,
                                current.weightMode,
                                event.target.value as RouletteWeightMode,
                            ),
                            weightMode: event.target.value as RouletteWeightMode,
                        })
                    }
                >
                    <option value="percentage">% 입력</option>
                    <option value="integer">정수 가중치</option>
                </select>
            </label>
            <label className={styles.spinDuration}>
                룰렛 회전 시간 <output>{spinDuration.toFixed(1)}초</output>
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={spinDuration}
                    onChange={(event) => onUpdate({ spinDuration: Number(event.target.value) })}
                />
            </label>
            <ul className={styles.items}>
                {current.items.map((item) => (
                    <li key={item.id}>
                        <input
                            aria-label={`${item.name || "이름없음"} 항목 이름`}
                            className={styles.itemName}
                            value={item.name}
                            onChange={(event) =>
                                onUpdate({
                                    items: current.items.map((candidate) =>
                                        candidate.id === item.id
                                            ? { ...candidate, name: event.target.value }
                                            : candidate,
                                    ),
                                })
                            }
                        />
                        <input
                            aria-label={`${item.name} 가중치`}
                            type="number"
                            min="0"
                            value={item.weight}
                            onChange={(event) =>
                                onUpdate({
                                    items: current.items.map((candidate) =>
                                        candidate.id === item.id
                                            ? {
                                                  ...candidate,
                                                  weight: Math.max(0, Number(event.target.value)),
                                              }
                                            : candidate,
                                    ),
                                })
                            }
                        />
                        <Button
                            variant="ghost"
                            onClick={() =>
                                onUpdate({
                                    items: current.items.filter(
                                        (candidate) => candidate.id !== item.id,
                                    ),
                                })
                            }
                        >
                            삭제
                        </Button>
                    </li>
                ))}
            </ul>
            <Button
                className={styles.addItemButton}
                disabled={external}
                onClick={onAddItem}
                icon={<FontAwesomeIcon icon={faCirclePlus} />}
            >
                항목 추가
            </Button>
        </div>
        {external && chatPanel && <section className={styles.embeddedChat}>{chatPanel}</section>}
    </section>
);
