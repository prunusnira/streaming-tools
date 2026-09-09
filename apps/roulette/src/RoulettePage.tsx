import { useEffect, useMemo, useState } from "react";
import {
    getAccessToken,
    getAuthenticatedAccounts,
    type AuthAccount,
    type AuthProvider,
} from "@streaming-tools/auth";
import { useChatConnections, type IncomingChatMessage } from "@streaming-tools/chat";
import { WheelRoulette, type RouletteChatMessage } from "@streaming-tools/roulette";
import styles from "@roulette/RoulettePage.module.css";

export const RoulettePage = () => {
    const [accounts, setAccounts] = useState<AuthAccount[]>();
    const [tokens, setTokens] = useState<Partial<Record<AuthProvider, string>>>({});
    const [messages, setMessages] = useState<RouletteChatMessage[]>([]);
    useEffect(() => {
        void getAuthenticatedAccounts()
            .then(setAccounts)
            .catch(() => setAccounts([]));
    }, []);
    useEffect(() => {
        if (!accounts?.length) return;
        void Promise.all(
            accounts.map(
                async (account) =>
                    [
                        account.provider,
                        (await getAccessToken(account.provider))?.accessToken ?? "",
                    ] as const,
            ),
        ).then((entries) => setTokens(Object.fromEntries(entries)));
    }, [accounts]);
    const onMessage = useMemo(
        () => (message: IncomingChatMessage) =>
            setMessages((previous) => [
                ...previous.slice(-199),
                { id: `${message.provider}:${message.id}`, text: message.text, time: Date.now() },
            ]),
        [],
    );
    const onError = useMemo(() => (_provider: AuthProvider, _message?: string) => {}, []);
    useChatConnections({
        accounts,
        accessTokens: tokens,
        onMessage,
        onConnectionError: onError,
        onTwitchClosed: () => window.alert("트위치 채팅 서버와 연결이 끊어졌어. 새로고침 해줘."),
    });
    return (
        <main className={styles.page}>
            <header className={styles.pageHeader}>
                <h1>원형 룰렛</h1>
                <div className={styles.description}>
                    <p>
                        룰렛은 수정하는 순간 브라우저에 저장됩니다. 변경된 사항은 되돌릴 수
                        없습니다.
                    </p>
                    <p>
                        룰렛을 채팅이나 후원으로 받는 경우 <code>!추가 [룰렛]</code> 형식으로 받을
                        수 있습니다.
                    </p>
                    <p className={styles.donationNotice}>
                        후원 연동 룰렛은 치지직으로만 가능합니다.
                    </p>
                </div>
            </header>
            <WheelRoulette
                hasAuthenticatedProvider={Boolean(accounts?.length)}
                onLoginRequested={() => window.location.assign("/account/login")}
                chatMessages={messages}
                chatPanel={
                    <section className={styles.chat}>
                        <h2>통합 채팅</h2>
                        {messages.length ? (
                            messages.map((message) => (
                                <p key={`${message.time}:${message.id}`}>{message.text}</p>
                            ))
                        ) : (
                            <p>채팅을 기다리고 있어.</p>
                        )}
                    </section>
                }
            />
        </main>
    );
};
