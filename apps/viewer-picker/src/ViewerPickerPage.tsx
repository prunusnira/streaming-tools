import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    getAccessTokens,
    getAuthenticatedAccounts,
    type AuthAccount,
    type AuthProvider,
} from "@streaming-tools/auth";
import { LoginRequiredAlert } from "@streaming-tools/auth/login-required-alert";
import { useChatConnections, type IncomingChatMessage } from "@streaming-tools/chat";
import { chooseRouletteItem, type RouletteItem } from "@streaming-tools/roulette";
import { ChatPanel } from "@viewer-picker/components/ChatPanel";
import { ParticipantPanel } from "@viewer-picker/components/ParticipantPanel";
import { RecruitmentControls } from "@viewer-picker/components/RecruitmentControls";
import { RouletteModal } from "@viewer-picker/components/RouletteModal";
import { SelectedChatModal } from "@viewer-picker/components/SelectedChatModal";
import {
    getParticipantKey,
    isEligibleMessage,
    type ChatEntry,
    type CollectionMode,
    type Participant,
    type ParticipantFilter,
} from "@viewer-picker/model/viewerPicker";
import styles from "@viewer-picker/ViewerPickerPage.module.css";

const speak = (text: string) => {
    if (!text.trim() || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
};

export const ViewerPickerPage = () => {
    const [accounts, setAccounts] = useState<AuthAccount[]>();
    const [accessTokens, setAccessTokens] = useState<Partial<Record<AuthProvider, string>>>({});
    const [collectionMode, setCollectionMode] = useState<CollectionMode>("all");
    const [prefix, setPrefix] = useState("!참여");
    const [isRecruiting, setIsRecruiting] = useState(false);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [allChats, setAllChats] = useState<ChatEntry[]>([]);
    const [filter, setFilter] = useState<ParticipantFilter>("all");
    const [selectedParticipantKey, setSelectedParticipantKey] = useState<string>();
    const [selectedChats, setSelectedChats] = useState<ChatEntry[]>([]);
    const [draw, setDraw] = useState<{ items: string[]; participant: Participant }>();
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const drawTimer = useRef<number | undefined>(undefined);

    useEffect(() => {
        void getAuthenticatedAccounts()
            .then(setAccounts)
            .catch(() => setAccounts([]));
    }, []);
    useEffect(() => {
        void getAccessTokens(accounts).then(setAccessTokens);
    }, [accounts]);
    useEffect(
        () => () => {
            if (drawTimer.current) window.clearTimeout(drawTimer.current);
        },
        [],
    );

    const onMessage = useCallback(
        (message: IncomingChatMessage) => {
            const chat = { ...message, receivedAt: Date.now() };
            const key = getParticipantKey(message);
            setAllChats((previous) => [...previous.slice(-199), chat]);
            setParticipants((previous) => {
                const participant = previous.find((item) => item.key === key);
                if (
                    !participant &&
                    (!isRecruiting || !isEligibleMessage(message, collectionMode, prefix))
                )
                    return previous;
                if (!participant)
                    return [
                        ...previous,
                        {
                            hasBeenSelected: false,
                            isIncluded: true,
                            key,
                            latestChat: chat,
                            name: message.name,
                        },
                    ];
                return previous.map((item) =>
                    item.key === key ? { ...item, latestChat: chat, name: message.name } : item,
                );
            });
            if (selectedParticipantKey === key) {
                setSelectedChats((previous) => [...previous.slice(-99), chat]);
                speak(message.text);
            }
        },
        [collectionMode, isRecruiting, prefix, selectedParticipantKey],
    );

    const onConnectionError = useCallback((_provider: AuthProvider, _message?: string) => {}, []);
    useChatConnections({
        accounts,
        accessTokens,
        onConnectionError,
        onMessage,
        onTwitchClosed: () => window.alert("트위치 채팅 서버와 연결이 끊어졌어. 새로고침 해줘."),
    });

    const selectedParticipant = participants.find((item) => item.key === selectedParticipantKey);
    const visibleParticipants = useMemo(
        () =>
            participants.filter((participant) => {
                if (filter === "selected") return participant.hasBeenSelected;
                if (filter === "unselected") return !participant.hasBeenSelected;
                return true;
            }),
        [filter, participants],
    );

    const handleToggleParticipant = (key: string) =>
        setParticipants((previous) =>
            previous.map((participant) =>
                participant.key === key
                    ? { ...participant, isIncluded: !participant.isIncluded }
                    : participant,
            ),
        );
    const handlePick = () => {
        const rouletteItems: RouletteItem[] = participants
            .filter((participant) => participant.isIncluded)
            .map((participant) => ({ id: participant.key, name: participant.name, weight: 1 }));
        const item = chooseRouletteItem(rouletteItems);
        if (!item) return;
        const participant = participants.find((candidate) => candidate.key === item.id);
        if (!participant) return;
        setDraw({ items: rouletteItems.map((rouletteItem) => rouletteItem.name), participant });
        if (drawTimer.current) window.clearTimeout(drawTimer.current);
        drawTimer.current = window.setTimeout(() => {
            setDraw(undefined);
            setParticipants((previous) =>
                previous.map((item) =>
                    item.key === participant.key
                        ? { ...item, hasBeenSelected: true, isIncluded: false }
                        : item,
                ),
            );
            setSelectedParticipantKey(participant.key);
            setSelectedChats(participant.latestChat ? [participant.latestChat] : []);
            setIsChatModalOpen(true);
        }, 2800);
    };

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1>참여자 추첨</h1>
                    <p>채팅으로 참가자를 모집하고 무작위로 한 명을 선택해봐.</p>
                </div>
                {!accounts?.length && (
                    <button type="button" onClick={() => window.location.assign("/account/login")}>
                        계정 연결하기
                    </button>
                )}
            </header>
            <RecruitmentControls
                collectionMode={collectionMode}
                hasEligibleParticipant={participants.some((participant) => participant.isIncluded)}
                isDrawing={draw !== undefined}
                isRecruiting={isRecruiting}
                participantCount={participants.length}
                prefix={prefix}
                onCollectionModeChange={setCollectionMode}
                onPick={handlePick}
                onPrefixChange={setPrefix}
                onToggleRecruiting={() => setIsRecruiting((previous) => !previous)}
            />
            <div className={styles.content}>
                <ParticipantPanel
                    filter={filter}
                    participants={participants}
                    visibleParticipants={visibleParticipants}
                    onFilterChange={setFilter}
                    onToggleParticipant={handleToggleParticipant}
                />
                <ChatPanel
                    chats={allChats}
                    selectedParticipant={selectedParticipant}
                    onOpenSelectedChat={() => setIsChatModalOpen(true)}
                />
            </div>
            {draw && <RouletteModal items={draw.items} participant={draw.participant} />}
            {isChatModalOpen && selectedParticipant && (
                <SelectedChatModal
                    chats={selectedChats}
                    participant={selectedParticipant}
                    onClose={() => setIsChatModalOpen(false)}
                />
            )}
            {accounts?.length === 0 && (
                <div className={styles.loginBackdrop} role="presentation">
                    <section aria-label="로그인 필요" className={styles.loginModal} role="dialog">
                        <h2>로그인 필요</h2>
                        <LoginRequiredAlert />
                    </section>
                </div>
            )}
        </main>
    );
};
