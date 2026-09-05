import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
    authProviderLabels,
    authProviderLogoUrls,
    authProviders,
    getAuthenticatedAccounts,
    type AuthAccount,
} from "@streaming-tools/auth";
import styles from "@misc/components/Header.module.css";

export const Header = () => {
    const [accounts, setAccounts] = useState<AuthAccount[]>([]);

    useEffect(() => {
        getAuthenticatedAccounts()
            .then(setAccounts)
            .catch(() => setAccounts([]));
    }, []);

    return (
        <header className={styles.header}>
            <Link to="/misc" className={styles.logo}>
                Streaming Tools
            </Link>
            <Link to="/banpick" className={styles.menuLink}>
                Ban &amp; Pick
            </Link>
            <div className={styles.loginStatus} aria-label="서비스별 로그인 상태">
                {authProviders.map((provider) => {
                    const account = accounts.find((item) => item.provider === provider);
                    return (
                        <span
                            key={provider}
                            className={account ? styles.connected : styles.disconnected}
                            title={
                                account
                                    ? account.name
                                    : "미연결"
                            }
                        >
                            <img
                                className={styles.providerLogo}
                                src={authProviderLogoUrls[provider]}
                                alt=""
                            />
                            {authProviderLabels[provider]}: {account?.name ?? "미연결"}
                        </span>
                    );
                })}
                <Link to="/account" className={styles.accountLink}>
                    계정
                </Link>
            </div>
        </header>
    );
};
