import type { ChatEntry, Participant } from "@viewer-picker/model/viewerPicker";
import styles from "./SelectedChatModal.module.css";

type SelectedChatModalProps = {
    chats: ChatEntry[];
    participant: Participant;
    onClose: () => void;
};

export const SelectedChatModal = ({ chats, participant, onClose }: SelectedChatModalProps) => (
    <div className={styles.backdrop} role="presentation">
        <section
            aria-label={`${participant.name}님과의 채팅`}
            className={styles.modal}
            role="dialog"
        >
            <div className={styles.header}>
                <h2>{participant.name}님의 채팅</h2>
                <button type="button" onClick={onClose}>
                    닫기
                </button>
            </div>
            {chats.length ? (
                <ul className={styles.list}>
                    {chats.map((chat) => (
                        <li key={`${chat.receivedAt}:${chat.text}`}>{chat.text}</li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>선택된 참가자의 채팅을 기다리고 있어.</p>
            )}
        </section>
    </div>
);
