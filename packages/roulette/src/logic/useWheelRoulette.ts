import { useEffect, useMemo, useRef, useState } from "react";
import {
    addRouletteItem,
    chooseRouletteItem,
    createDefaultRoulette,
    createRoulette,
    createRouletteItem,
    getDonationSettings,
    getDonationTiers,
    getRouletteItemName,
    getWheelBackground,
    getWheelRotationForItem,
    getWheelSegments,
    type RouletteInputMode,
    type SavedRoulette,
} from "../model/roulette";
import { loadRoulettes, saveRoulettes } from "./rouletteStorage";

export type RouletteChatMessage = { id: string; text: string; time: number };
export type RouletteAlertType = "delete" | "login" | undefined;

const commandPrefix = "!추가 ";

export const useWheelRoulette = ({
    chatMessages,
    hasAuthenticatedProvider,
}: {
    chatMessages: RouletteChatMessage[];
    hasAuthenticatedProvider: boolean;
}) => {
    const [saved, setSaved] = useState<SavedRoulette[]>(loadRoulettes);
    const [current, setCurrent] = useState<SavedRoulette>(
        () => loadRoulettes()[0] ?? createDefaultRoulette(),
    );
    const [connected, setConnected] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<string>();
    const [spinning, setSpinning] = useState(false);
    const [resultOpen, setResultOpen] = useState(false);
    const [alertType, setAlertType] = useState<RouletteAlertType>();
    const [donationSettingsOpen, setDonationSettingsOpen] = useState(false);
    const observedChatMessages = useRef(new Set<string>());
    const resultTimer = useRef<number | undefined>(undefined);
    const external = current.inputMode !== "manual";
    const chatMode = current.inputMode === "chat";
    const donationSettings = getDonationSettings(current);
    const donationTiers = getDonationTiers(donationSettings);
    const spinDuration = Math.min(Math.max(current.spinDuration ?? 3, 0), 10);
    const background = useMemo(() => getWheelBackground(current.items), [current.items]);
    const segments = useMemo(() => getWheelSegments(current.items), [current.items]);
    const update = (next: Partial<SavedRoulette>) =>
        setCurrent((previous) => ({ ...previous, ...next, updatedAt: Date.now() }));

    useEffect(() => {
        setSaved((previous) => {
            const index = previous.findIndex((item) => item.id === current.id);
            const next =
                index === -1
                    ? [...previous, current]
                    : previous.map((item) => (item.id === current.id ? current : item));
            saveRoulettes(next);
            return next;
        });
    }, [current]);
    useEffect(() => {
        for (const message of chatMessages) {
            const key = `${message.time}:${message.id}:${message.text}`;
            if (observedChatMessages.current.has(key)) continue;
            observedChatMessages.current.add(key);
            if (!connected || !chatMode || !message.text.startsWith(commandPrefix)) continue;
            const itemName = message.text.slice(commandPrefix.length).trim();
            if (!itemName) continue;
            setCurrent((previous) => ({
                ...previous,
                items: addRouletteItem(previous.items, itemName),
                updatedAt: Date.now(),
            }));
        }
    }, [chatMessages, chatMode, connected]);
    useEffect(
        () => () => {
            if (resultTimer.current) window.clearTimeout(resultTimer.current);
        },
        [],
    );

    const selectMode = (inputMode: RouletteInputMode) => {
        if (inputMode !== "manual" && !hasAuthenticatedProvider) {
            setAlertType("login");
            return;
        }
        setConnected(false);
        update({ inputMode, weightMode: inputMode === "manual" ? current.weightMode : "integer" });
    };
    const selectRoulette = (roulette: SavedRoulette) => {
        setCurrent(roulette);
        setWinner(undefined);
    };
    const addItem = () => update({ items: [...current.items, createRouletteItem()] });
    const toggleExternalItemInput = () => {
        if (connected) {
            setConnected(false);
            return;
        }
        if (!hasAuthenticatedProvider) {
            setAlertType("login");
            return;
        }
        setConnected(true);
    };
    const spin = () => {
        const selected = chooseRouletteItem(current.items);
        if (!selected) return;
        if (resultTimer.current) window.clearTimeout(resultTimer.current);
        setWinner(undefined);
        setResultOpen(false);
        setSpinning(true);
        setRotation((value) =>
            getWheelRotationForItem(
                segments,
                selected.id,
                value,
                4 + Math.floor(Math.random() * 3),
            ),
        );
        const showResult = () => {
            setWinner(getRouletteItemName(selected));
            setSpinning(false);
            setResultOpen(true);
        };
        if (spinDuration === 0) showResult();
        else resultTimer.current = window.setTimeout(showResult, spinDuration * 1000);
    };
    const newRoulette = () => {
        setCurrent(createRoulette());
        setWinner(undefined);
        setConnected(false);
    };
    const deleteRoulette = () => {
        setSaved((previous) => {
            const index = previous.findIndex((item) => item.id === current.id);
            const next = previous.filter((item) => item.id !== current.id);
            saveRoulettes(next);
            setCurrent(next[index] ?? next.at(-1) ?? createDefaultRoulette());
            setWinner(undefined);
            setConnected(false);
            return next;
        });
    };

    return {
        addItem,
        alertType,
        background,
        chatMode,
        connected,
        current,
        deleteRoulette,
        donationSettings,
        donationSettingsOpen,
        donationTiers,
        external,
        newRoulette,
        resultOpen,
        rotation,
        saved,
        segments,
        selectMode,
        selectRoulette,
        setAlertType,
        setDonationSettingsOpen,
        setResultOpen,
        spin,
        spinDuration,
        spinning,
        toggleExternalItemInput,
        update,
        winner,
    };
};
