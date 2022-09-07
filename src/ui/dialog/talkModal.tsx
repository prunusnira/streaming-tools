import { useContext } from "react";
import { TalkContext } from "../../lib/context/talkProvider";
import { TeamContext } from "../../lib/context/teamProvider";
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
    const { data, pickedUser, talkHistory, negoMode, initTime, closeTalkDialog } =
        useContext(TalkContext);
    const { userList, updateUserList } = useContext(TeamContext);

    const cancelDialog = () => {
        closeTalkDialog();
    };

    const skipDialog = () => {
        const idx = userList.findIndex((x) => x.userid === pickedUser.userid);
        userList[idx].picked = true;
        updateUserList(userList);
        closeTalkDialog();
    };

    return (
        <Portal domid="#talkdlg">
            <DialogOuter active={data.active}>
                <DialogContainer width={data.width} maxWidth={data.maxWidth}>
                    <DialogHeader>
                        <TalkDlgHeader active={data.active} user={pickedUser} initTime={initTime} />
                    </DialogHeader>
                    <DialogBody>
                        <TalkDlg team={pickedUser.team} msglist={talkHistory} negoMode={negoMode} />
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
