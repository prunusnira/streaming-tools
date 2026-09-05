import { useContext } from "react";
import { Button } from "@streaming-tools/ui";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { authProviderLabels } from "@streaming-tools/auth";
import { StreamerContext } from "@banpick/features/streamer/model/StreamerProvider";
import { HowtoDialogBody } from "@banpick/app/components/howto/HowtoDialogBody";
import { HowtoDialogFooter } from "@banpick/app/components/howto/HowtoDialogFooter";
import { HowtoDialogHeader } from "@banpick/app/components/howto/HowtoDialogHeader";
import styles from "./Header.module.css";

export const Header = () => {
    const { data: dataStreamer } = useContext(StreamerContext);
    const { openDialog, closeDialog } = useContext(ModalContext);

    return (
        <header className={styles.headerContainer}>
            <div className={`${styles.headerItem} ${styles.headerTitle}`}>BAN & PICK</div>
            <div className={styles.headerItem}>
                {dataStreamer.iconurl ? (
                    <img
                        className={styles.headerIcon}
                        src={dataStreamer.iconurl}
                        alt="스트리머 프로필"
                    />
                ) : (
                    <span className={styles.headerIconPlaceholder} aria-hidden="true" />
                )}
                {dataStreamer.provider
                    ? `${authProviderLabels[dataStreamer.provider]} · ${dataStreamer.displayname}`
                    : "비로그인"}
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
