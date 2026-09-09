import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@streaming-tools/ui/components/button";
import { createDonationTier, type DonationSettings, type SavedRoulette } from "../model/roulette";
import type { RouletteAlertType } from "../logic/useWheelRoulette";
import styles from "./RouletteDialogs.module.css";

type Props = {
    alertType: RouletteAlertType;
    donationSettings: DonationSettings;
    donationSettingsOpen: boolean;
    donationTiers: DonationSettings["tiers"];
    onCloseAlert: () => void;
    onCloseDonationSettings: () => void;
    onCloseResult: () => void;
    onConfirmDelete: () => void;
    onLoginRequested: () => void;
    onUpdate: (next: Partial<SavedRoulette>) => void;
    resultOpen: boolean;
    winner?: string;
};

export const RouletteDialogs = ({
    alertType,
    donationSettings,
    donationSettingsOpen,
    donationTiers,
    onCloseAlert,
    onCloseDonationSettings,
    onCloseResult,
    onConfirmDelete,
    onLoginRequested,
    onUpdate,
    resultOpen,
    winner,
}: Props) => {
    const updateDonationSettings = (next: Partial<DonationSettings>) =>
        onUpdate({ donationSettings: { ...donationSettings, ...next } });

    const handleMinimumAmountEnabledChange = (event: ChangeEvent<HTMLInputElement>) =>
        updateDonationSettings({ minimumAmountEnabled: event.target.checked });

    const handleMinimumAmountChange = (event: ChangeEvent<HTMLInputElement>) =>
        updateDonationSettings({ minimumAmount: Math.max(0, Number(event.target.value)) });

    const handleTierMinimumAmountChange =
        (tierId: string) => (event: ChangeEvent<HTMLInputElement>) =>
            updateDonationSettings({
                tiers: donationSettings.tiers.map((candidate) =>
                    candidate.id === tierId
                        ? { ...candidate, minimumAmount: Math.max(0, Number(event.target.value)) }
                        : candidate,
                ),
            });

    const handleTierWeightChange = (tierId: string) => (event: ChangeEvent<HTMLInputElement>) =>
        updateDonationSettings({
            tiers: donationSettings.tiers.map((candidate) =>
                candidate.id === tierId
                    ? { ...candidate, weight: Math.max(1, Number(event.target.value)) }
                    : candidate,
            ),
        });

    const handleTierDelete = (tierId: string) =>
        updateDonationSettings({
            tiers: donationSettings.tiers.filter((candidate) => candidate.id !== tierId),
        });

    const handleTierAdd = () => {
        const highest = Math.max(...donationSettings.tiers.map((tier) => tier.minimumAmount));
        updateDonationSettings({
            tiers: [...donationSettings.tiers, createDonationTier(highest + 1000)],
        });
    };

    return (
        <>
            {alertType && (
                <div className={styles.alertBackdrop} role="presentation">
                    <section className={styles.alert} role="alertdialog" aria-modal="true">
                        <h2 className={styles.alertTitle}>알림</h2>
                        <p>
                            {alertType === "delete"
                                ? "현재 룰렛을 삭제합니다. 삭제된 룰렛은 복구할 수 없습니다"
                                : "채팅/후원 연동 시 로그인이 필요합니다"}
                        </p>
                        <div className={styles.actions}>
                            {alertType === "delete" ? (
                                <Button variant="destructive" onClick={onConfirmDelete}>
                                    삭제
                                </Button>
                            ) : (
                                <Button onClick={onLoginRequested}>로그인하기</Button>
                            )}
                            <Button variant="outline" onClick={onCloseAlert}>
                                취소
                            </Button>
                        </div>
                    </section>
                </div>
            )}
            {resultOpen && winner && (
                <div className={styles.alertBackdrop} role="presentation">
                    <section
                        className={styles.resultAlert}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="roulette-result-title"
                    >
                        <div className={styles.fireworks} aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                        <p id="roulette-result-title" className={styles.resultLabel}>
                            룰렛 결과
                        </p>
                        <strong className={styles.resultWinner}>{winner}</strong>
                        <p className={styles.resultMessage}>당첨!</p>
                        <Button onClick={onCloseResult}>닫기</Button>
                    </section>
                </div>
            )}
            {donationSettingsOpen && (
                <div className={styles.alertBackdrop} role="presentation">
                    <section
                        className={styles.donationDialog}
                        role="dialog"
                        aria-modal="true"
                        aria-label="후원 금액 구간 설정"
                    >
                        <header className={styles.donationHeader}>
                            <h2>후원 금액 구간 설정</h2>
                            <Button variant="ghost" onClick={onCloseDonationSettings}>
                                닫기
                            </Button>
                        </header>
                        <label className={styles.minimumToggle}>
                            <input
                                type="checkbox"
                                checked={donationSettings.minimumAmountEnabled}
                                onChange={handleMinimumAmountEnabledChange}
                            />
                            최소 금액 설정
                        </label>
                        <label className={styles.minimumAmount}>
                            최소 금액
                            <input
                                type="number"
                                min="0"
                                disabled={!donationSettings.minimumAmountEnabled}
                                value={donationSettings.minimumAmount}
                                onChange={handleMinimumAmountChange}
                            />
                            원
                        </label>
                        <p className={styles.donationHelp}>
                            각 구간은 입력한 금액 이상부터 다음 구간 직전까지 적용돼. 첫 구간은 0원
                            또는 최소 금액부터 고정이고, 마지막 구간은 최대 금액 제한 없이 적용돼.
                        </p>
                        <table className={styles.donationTable}>
                            <thead>
                                <tr>
                                    <th scope="col">시작 금액</th>
                                    <th scope="col">적용 구간</th>
                                    <th scope="col">자동 추가 비율</th>
                                    <th aria-label="삭제" />
                                </tr>
                            </thead>
                            <tbody>
                                {donationTiers.map((tier, index, tiers) => {
                                    const nextTier = tiers[index + 1];
                                    return (
                                        <tr key={tier.id}>
                                            <td>
                                                {index === 0 ? (
                                                    `${tier.minimumAmount.toLocaleString()}원 이상`
                                                ) : (
                                                    <>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={tier.minimumAmount}
                                                            onChange={handleTierMinimumAmountChange(
                                                                tier.id,
                                                            )}
                                                        />
                                                        원 이상
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                {nextTier
                                                    ? `${Math.max(tier.minimumAmount, nextTier.minimumAmount - 1).toLocaleString()}원 이하`
                                                    : "제한 없음"}
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={tier.weight}
                                                    onChange={handleTierWeightChange(tier.id)}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    variant="ghost"
                                                    disabled={donationSettings.tiers.length === 1}
                                                    onClick={() => handleTierDelete(tier.id)}
                                                >
                                                    삭제
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Button
                            className={styles.addTierButton}
                            onClick={handleTierAdd}
                            icon={<FontAwesomeIcon icon={faCirclePlus} />}
                        >
                            금액 구간 추가
                        </Button>
                    </section>
                </div>
            )}
        </>
    );
};
import type { ChangeEvent } from "react";
