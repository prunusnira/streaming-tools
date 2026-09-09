import type { ReactNode } from "react";
import { useWheelRoulette, type RouletteChatMessage } from "../logic/useWheelRoulette";
import { RouletteDialogs } from "./RouletteDialogs";
import { RouletteOptions } from "./RouletteOptions";
import { RouletteSidebar } from "./RouletteSidebar";
import { RouletteWheel } from "./RouletteWheel";
import styles from "./WheelRoulette.module.css";

export type { RouletteChatMessage } from "../logic/useWheelRoulette";

type Props = {
    chatMessages?: RouletteChatMessage[];
    chatPanel?: ReactNode;
    hasAuthenticatedProvider: boolean;
    onLoginRequested: () => void;
};

export const WheelRoulette = ({
    chatMessages = [],
    chatPanel,
    hasAuthenticatedProvider,
    onLoginRequested,
}: Props) => {
    const roulette = useWheelRoulette({ chatMessages, hasAuthenticatedProvider });

    return (
        <section className={styles.workspace} aria-label="원형 룰렛">
            <RouletteSidebar
                current={roulette.current}
                saved={roulette.saved}
                onNew={roulette.newRoulette}
                onReset={() => roulette.update({ items: [], title: "새 룰렛" })}
                onDeleteRequested={() => roulette.setAlertType("delete")}
                onSelect={roulette.selectRoulette}
            />
            <RouletteOptions
                chatMode={roulette.chatMode}
                chatPanel={chatPanel}
                connected={roulette.connected}
                current={roulette.current}
                external={roulette.external}
                spinDuration={roulette.spinDuration}
                onAddItem={roulette.addItem}
                onOpenDonationSettings={() => roulette.setDonationSettingsOpen(true)}
                onSelectMode={roulette.selectMode}
                onToggleExternalInput={roulette.toggleExternalItemInput}
                onUpdate={roulette.update}
            />
            <RouletteWheel
                background={roulette.background}
                current={roulette.current}
                rotation={roulette.rotation}
                segments={roulette.segments}
                spinDuration={roulette.spinDuration}
                spinning={roulette.spinning}
                winner={roulette.winner}
                onSpin={roulette.spin}
            />
            <RouletteDialogs
                alertType={roulette.alertType}
                donationSettings={roulette.donationSettings}
                donationSettingsOpen={roulette.donationSettingsOpen}
                donationTiers={roulette.donationTiers}
                resultOpen={roulette.resultOpen}
                winner={roulette.winner}
                onCloseAlert={() => roulette.setAlertType(undefined)}
                onCloseDonationSettings={() => roulette.setDonationSettingsOpen(false)}
                onCloseResult={() => roulette.setResultOpen(false)}
                onConfirmDelete={() => {
                    roulette.deleteRoulette();
                    roulette.setAlertType(undefined);
                }}
                onLoginRequested={onLoginRequested}
                onUpdate={roulette.update}
            />
        </section>
    );
};
