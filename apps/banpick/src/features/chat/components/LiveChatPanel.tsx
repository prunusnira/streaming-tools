import { useContext, useEffect, useRef } from "react";
import { authProviderLabels } from "@streaming-tools/auth";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import styles from "@banpick/features/chat/components/LiveChatPanel.module.css";

export const LiveChatPanel = () => {
    const { connectionErrors, liveChatHistory } = useContext(TalkContext);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    }, [liveChatHistory]);

    return (
        <section className={styles.panel} aria-label="통합 채팅">
            <header className={styles.header}>통합 채팅</header>
            {Object.entries(connectionErrors).map(([provider, message]) => (
                <p className={styles.error} key={provider} role="status">
                    {authProviderLabels[provider as keyof typeof authProviderLabels]}: {message}
                </p>
            ))}
            <div className={styles.messages} ref={listRef}>
                {liveChatHistory.length === 0 ? (
                    <p className={styles.empty}>연결된 서비스의 채팅을 기다리고 있어.</p>
                ) : (
                    liveChatHistory.map((message, index) => (
                        <article className={styles.message} key={`${message.time}-${index}`}>
                            {message.provider && (
                                <span className={styles.provider} data-provider={message.provider}>
                                    {authProviderLabels[message.provider]}
                                </span>
                            )}
                            <strong className={styles.name}>{message.name}</strong>
                            <p className={styles.text}>{message.msg}</p>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
};
