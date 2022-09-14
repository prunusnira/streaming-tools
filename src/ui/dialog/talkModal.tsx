import { useContext } from "react";
import { ModalType } from "../../data/modal";
import { emptyUser } from "../../data/user";
import { ModalContext } from "../../lib/context/modalProvider";
import { TalkContext } from "../../lib/context/talkProvider";
import { TeamContext } from "../../lib/context/teamProvider";
import AlertDialog from "./alert/alertDlg";
import {
    DialogOuter,
    DialogContainer,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "./modal.style";
import Portal from "./portal";
import TalkDlg from "./talk/talkDlg";
import TalkDlgFooter from "./talk/talkDlgFooter";
import TalkDlgHeader from "./talk/talkDlgHeader";

const TalkModal = () => {
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
                    msg={
                        "이 시청자 선택을 취소하시겠습니까? (목록에 그대로 남아있으며 다시 선택될 수 있습니다)"
                    }
                    btnOk={"취소하기"}
                    btn={"닫기"}
                    ok={() => {
                        changePickedUser(emptyUser);
                        closeAlertDialog();
                    }}
                    closeDialog={closeDialog}
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
                    msg={
                        "이 시청자를 스킵하시겠습니까? (목록에서 취소선이 추가되며 직접 해제하기 전까지는 다시 선택될 수 없습니다)"
                    }
                    btnOk={"스킵하기"}
                    btn={"닫기"}
                    ok={() => {
                        const idx = userList.findIndex((x) => x.userid === pickedUser.userid);
                        userList[idx].picked = true;
                        updateUserList(userList);
                        changePickedUser(emptyUser);
                        closeAlertDialog();
                    }}
                    closeDialog={closeDialog}
                />
            ),
            footer: undefined,
        });
    };

    return (
        <Portal domid="#talkdlg">
            <DialogOuter active={data.active}>
                <DialogContainer width={data.width} maxWidth={data.maxWidth}>
                    <DialogHeader>
                        <TalkDlgHeader active={data.active} user={pickedUser} initTime={initTime} />
                    </DialogHeader>
                    <DialogBody>
                        <TalkDlg
                            pickedUser={pickedUser}
                            msglist={talkHistory}
                            negoMode={negoMode}
                        />
                    </DialogBody>
                    <DialogFooter>
                        <TalkDlgFooter skipDialog={skipDialog} cancelDialog={cancelDialog} />
                    </DialogFooter>
                </DialogContainer>
            </DialogOuter>
        </Portal>
    );
};

export default TalkModal;
