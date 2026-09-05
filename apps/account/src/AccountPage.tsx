import { useEffect, useState } from "react";
import { Button, Loading } from "@streaming-tools/ui";
import { authProviderLabels, authProviderLogoUrls, authProviders } from "@streaming-tools/auth";
import { Account, getAccounts, logout, logoutProvider, startLogin } from "@account/api";
import styles from "@account/AccountPage.module.css";

const logoutIcon = (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none">
        <path d="M10 5H5v14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
            d="m14 8 4 4-4 4M18 12H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export const AccountPage = () => {
    const [accounts, setAccounts] = useState<Account[]>();
    const refreshAccounts = async () => {
        try {
            setAccounts(await getAccounts());
        } catch {
            setAccounts([]);
        }
    };

    useEffect(() => {
        void refreshAccounts();
    }, []);
    if (accounts === undefined) return <Loading className={styles.loading} />;
    const handleLogout = async (provider: Account["provider"]) => {
        try {
            await logoutProvider(provider);
            await refreshAccounts();
        } catch {
            window.alert("로그아웃에 실패했어. 잠시 후 다시 시도해줘.");
        }
    };

    const handleLogoutAll = async () => {
        try {
            await logout();
            await refreshAccounts();
        } catch {
            window.alert("로그아웃에 실패했어. 잠시 후 다시 시도해줘.");
        }
    };

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>계정 관리</h1>
            <p className={styles.description}>서비스마다 별도로 로그인하거나 로그아웃할 수 있어.</p>
            <ul className={styles.accountList}>
                {authProviders.map((provider) => {
                    const account = accounts.find((item) => item.provider === provider);
                    return (
                        <li key={provider} className={styles.accountItem}>
                            <div className={styles.accountInfo}>
                                <img
                                    className={styles.providerLogo}
                                    src={authProviderLogoUrls[provider]}
                                    alt={`${authProviderLabels[provider]} 로고`}
                                />
                                {account?.imageUrl ? (
                                    <img
                                        className={styles.profileImage}
                                        src={account.imageUrl}
                                        alt={`${account.name} 프로필`}
                                    />
                                ) : (
                                    <span
                                        className={styles.profilePlaceholder}
                                        aria-hidden="true"
                                    />
                                )}
                                <div>
                                    <strong>{authProviderLabels[provider]}</strong>
                                    {account ? (
                                        <span className={styles.accountName}>{account.name}</span>
                                    ) : (
                                        <span className={styles.disconnected}>로그인하지 않음</span>
                                    )}
                                </div>
                            </div>
                            {account ? (
                                <Button
                                    variant="outline"
                                    icon={logoutIcon}
                                    onClick={() => void handleLogout(provider)}
                                >
                                    로그아웃
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    icon={
                                        <img
                                            className={styles.buttonLogo}
                                            src={authProviderLogoUrls[provider]}
                                            alt=""
                                        />
                                    }
                                    onClick={() => void startLogin(provider)}
                                >
                                    로그인
                                </Button>
                            )}
                        </li>
                    );
                })}
            </ul>
            {accounts.length > 0 ? (
                <Button
                    variant="destructive"
                    className={styles.logoutButton}
                    icon={logoutIcon}
                    onClick={() => void handleLogoutAll()}
                >
                    모든 서비스 로그아웃
                </Button>
            ) : null}
        </main>
    );
};
