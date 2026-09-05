import { useContext } from "react";
import { AlertDialog, cn, ModalType, Portal } from "@streaming-tools/ui";
import { emptyUser } from "@banpick/features/streamer/model/user";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { TeamContext } from "@banpick/features/banpick/model/TeamProvider";
import styles from "@banpick/shared/modal/Modal.module.css";
import { TalkDialog } from "./talk/TalkDialog";
import { TalkDialogFooter } from "./talk/TalkDialogFooter";
import { TalkDialogHeader } from "./talk/TalkDialogHeader";

export const TalkModal = () => {
    const { data, pickedUser, talkHistory, negoMode, initTime, closeTalkDialog, changePickedUser } =
        useContext(TalkContext);
    const { openDialog, closeDialog } = useContext(ModalContext);
    const { userList, updateUserList } = useContext(TeamContext);

    const closeAlertDialog = () => {
        closeDialog();
        closeTalkDialog();
    };

    const cancelDialog = () => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: "사용자 취소",
            body: (
                <AlertDialog
                    type={ModalType.TwoBtn}
                    message={
                        "이 시청자 선택을 취소하시겠습니까? (목록에 그대로 남아있으며 다시 선택될 수 있습니다)"
                    }
                    confirmLabel={"취소하기"}
                    cancelLabel={"닫기"}
                    onConfirm={() => {
                        changePickedUser(emptyUser);
                        closeAlertDialog();
                    }}
                    onCancel={closeDialog}
                />
            ),
            footer: undefined,
        });
    };

    const skipDialog = () => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: "사용자 스킵",
            body: (
                <AlertDialog
                    type={ModalType.TwoBtn}
                    message={
                        "이 시청자를 스킵하시겠습니까? (목록에서 취소선이 추가되며 직접 해제하기 전까지는 다시 선택될 수 없습니다)"
                    }
                    confirmLabel={"스킵하기"}
                    cancelLabel={"닫기"}
                    onConfirm={() => {
                        const idx = userList.findIndex((x) => x.userid === pickedUser.userid);
                        userList[idx].picked = true;
                        updateUserList(userList);
                        changePickedUser(emptyUser);
                        closeAlertDialog();
                    }}
                    onCancel={closeDialog}
                />
            ),
            footer: undefined,
        });
    };

    return (
        <Portal id="talkdlg">
            <section className={cn(styles.dialogOuter, !data.active && styles.dialogHidden)}>
                <section
                    className={styles.dialogContainer}
                    style={{ width: data.width, maxWidth: data.maxWidth }}
                >
                    <div className={styles.dialogHeader}>
                        <TalkDialogHeader
                            active={data.active}
                            user={pickedUser}
                            initTime={initTime}
                        />
                    </div>
                    <div className={styles.dialogBody}>
                        <TalkDialog
                            pickedUser={pickedUser}
                            msglist={talkHistory}
                            negoMode={negoMode}
                        />
                    </div>
                    <div className={styles.dialogFooter}>
                        <TalkDialogFooter skipDialog={skipDialog} cancelDialog={cancelDialog} />
                    </div>
                </section>
            </section>
        </Portal>
    );
};
