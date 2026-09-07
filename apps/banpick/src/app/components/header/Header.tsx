import { useContext } from "react";
import { Button } from "@streaming-tools/ui";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { authProviderLabels, authProviderLogoUrls } from "@streaming-tools/auth";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { HowtoDialogBody } from "@banpick/app/components/howto/HowtoDialogBody";
import { HowtoDialogFooter } from "@banpick/app/components/howto/HowtoDialogFooter";
import { HowtoDialogHeader } from "@banpick/app/components/howto/HowtoDialogHeader";
import styles from "./Header.module.css";

export const Header = () => {
    const { accounts } = useContext(StreamerContext);
    const { openDialog, closeDialog } = useContext(ModalContext);

    return (
        <header className={styles.headerContainer}>
            <div className={`${styles.headerItem} ${styles.headerTitle}`}>BAN & PICK</div>
            <div className={`${styles.headerItem} ${styles.accountList}`}>
                {accounts?.length ? (
                    accounts.map((account) => (
                        <div className={styles.account} key={account.provider}>
                            <img
                                className={styles.providerLogo}
                                src={authProviderLogoUrls[account.provider]}
                                alt=""
                            />
                            {account.imageUrl ? (
                                <img
                                    className={styles.headerIcon}
                                    src={account.imageUrl}
                                    alt={`${account.name} 프로필`}
                                />
                            ) : (
                                <span className={styles.headerIconPlaceholder} aria-hidden="true" />
                            )}
                            <span>{`${authProviderLabels[account.provider]} · ${account.name}`}</span>
                        </div>
                    ))
                ) : (
                    <span>비로그인</span>
                )}
            </div>
            <div className={`${styles.headerItem} ${styles.headerActions}`}>
                <Button
                    variant="default"
                    size="lg"
                    onClick={() => {
                        openDialog({
                            width: "90%",
                            maxWidth: 1024,
                            header: <HowtoDialogHeader />,
                            body: <HowtoDialogBody />,
                            footer: <HowtoDialogFooter closeDialog={closeDialog} />,
                            active: true,
                        });
                    }}
                >
                    사용방법
                </Button>
            </div>
        </header>
    );
};
