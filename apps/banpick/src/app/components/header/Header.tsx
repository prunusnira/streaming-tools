import { useContext, useState } from "react";
import { Button } from "@streaming-tools/ui";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { HowtoDialogBody } from "@banpick/app/components/howto/HowtoDialogBody";
import { HowtoDialogFooter } from "@banpick/app/components/howto/HowtoDialogFooter";
import { HowtoDialogHeader } from "@banpick/app/components/howto/HowtoDialogHeader";
import styles from "./Header.module.css";

export const Header = () => {
    const { openDialog, closeDialog } = useContext(ModalContext);
    const [todayTopic, setTodayTopic] = useState(
        () => window.localStorage.getItem("banpick.todayTopic") ?? "",
    );
    const [topicDraft, setTopicDraft] = useState(todayTopic);
    const [editingTopic, setEditingTopic] = useState(false);
    const saveTodayTopic = () => {
        const nextTopic = topicDraft.trim();
        setTodayTopic(nextTopic);
        window.localStorage.setItem("banpick.todayTopic", nextTopic);
        setEditingTopic(false);
    };

    return (
        <header className={styles.headerContainer}>
            <div className={`${styles.headerItem} ${styles.headerTitle}`}>BAN & PICK</div>
            <div className={`${styles.headerItem} ${styles.accountList}`}>
                <div className={styles.todayTopic}>
                    <div className={styles.todayTopicContent}>
                        <span>오늘의 밴픽 주제</span>
                        {editingTopic ? (
                            <input
                                aria-label="오늘의 밴픽 주제"
                                autoFocus
                                value={topicDraft}
                                onChange={(event) => setTopicDraft(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") saveTodayTopic();
                                }}
                            />
                        ) : (
                            <strong>{todayTopic || "오늘의 밴픽 주제를 입력해줘"}</strong>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (editingTopic) saveTodayTopic();
                            else {
                                setTopicDraft(todayTopic);
                                setEditingTopic(true);
                            }
                        }}
                    >
                        {editingTopic ? "저장" : "수정"}
                    </Button>
                </div>
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
