import type { ChatEntry, Participant } from "@viewer-picker/model/viewerPicker";
import styles from "./ChatPanel.module.css";

type ChatPanelProps = {
    chats: ChatEntry[];
    selectedParticipant?: Participant;
    onOpenSelectedChat: () => void;
};

export const ChatPanel = ({ chats, selectedParticipant, onOpenSelectedChat }: ChatPanelProps) => (
    <section aria-live="polite" className={styles.panel}>
        <div className={styles.header}>
            <h2>전체 채팅</h2>
            {selectedParticipant && (
                <button type="button" onClick={onOpenSelectedChat}>
                    {selectedParticipant.name}님 대화 보기
                </button>
            )}
        </div>
        {chats.length ? (
            <ul className={styles.list}>
                {chats.map((chat) => (
                    <li key={`${chat.receivedAt}:${chat.provider}:${chat.id}`}>
                        <strong>{chat.name}</strong> {chat.text}
                    </li>
                ))}
            </ul>
        ) : (
            <p className={styles.empty}>수신한 전체 채팅을 여기에 보여줘.</p>
        )}
    </section>
);
