import { useContext, useState } from "react";
import { TeamContext } from "../../lib/context/teamProvider";
import ListColumn from "../listLayout/listColumn";
import { BanpickListContainer } from "./banpickList.style";
import BanpickItem from "./banpickItem";
import { Message } from "../../data/message";
import BanpickListEmpty from "./banpickListEmpty";
import { TalkContext } from "../../lib/context/talkProvider";
import { ModalContext } from "../../lib/context/modalProvider";
import EditDlg from "../dialog/edit/editDlg";
import EditDlgHeader from "../dialog/edit/editDlgHeader";
import DeleteDlgHeader from "../dialog/delete/deleteDlgHeader";
import DeleteDlg from "../dialog/delete/deleteDlg";
import DeleteDlgFooter from "../dialog/delete/deleteDlgFooter";

const BanpickList = () => {
    const [_, forceUpdate] = useState(0);
    const { team1, team2, updateTeam1, updateTeam2 } = useContext(TeamContext);
    const { openDialog, closeDialog } = useContext(ModalContext);
    const { changeNegoMode, openTalkDialog } = useContext(TalkContext);

    const checkLength = (arr: Array<Message>) => {
        return arr.length > 0;
    };

    const changeBanStatus = (teamNum: number, idx: number) => {
        if (teamNum === 1) {
            team1.pickList[idx].ban = !team1.pickList[idx].ban;
            updateTeam1(team1);
        }
        if (teamNum === 2) {
            team2.pickList[idx].ban = !team2.pickList[idx].ban;
            updateTeam2(team2);
        }
        forceUpdate((p) => p + 1);
    };

    const openEditDialog = (teamNum: number, idx: number, msg: Message) => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: <EditDlgHeader />,
            body: (
                <EditDlg
                    teamNum={teamNum}
                    idx={idx}
                    msg={msg}
                    closeDialog={closeDialog}
                    editText={editMessage}
                />
            ),
            footer: undefined,
        });
    };

    const openDeleteDialog = (teamNum: number, idx: number) => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: <DeleteDlgHeader />,
            body: <DeleteDlg />,
            footer: (
                <DeleteDlgFooter
                    team={teamNum}
                    idx={idx}
                    deleteMessage={deleteMessage}
                    closeDialog={closeDialog}
                />
            ),
        });
    };

    const openNegoMode = () => {
        changeNegoMode(true);
        openTalkDialog();
    };

    const editMessage = (teamNum: number, idx: number, text: string) => {
        if (teamNum === 1) {
            team1.pickList[idx].msg = text;
            updateTeam1(team1);
        }
        if (teamNum === 2) {
            team2.pickList[idx].msg = text;
            updateTeam2(team2);
        }
        closeDialog();
        forceUpdate((p) => p + 1);
    };

    const deleteMessage = (teamNum: number, idx: number) => {
        if (teamNum === 1) {
            delete team1.pickList[idx];
            team1.curPick--;
            updateTeam1(team1);
        }
        if (teamNum === 2) {
            delete team2.pickList[idx];
            team2.curPick--;
            updateTeam2(team2);
        }
        closeDialog();
        forceUpdate((p) => p + 1);
    };

    return (
        <BanpickListContainer>
            <ListColumn teamInfo={team1}>
                {checkLength(team1.pickList) ? (
                    team1.pickList.map((x, i) => (
                        <BanpickItem
                            team={1}
                            item={x}
                            idx={i}
                            changeBanStatus={changeBanStatus}
                            openEditDialog={openEditDialog}
                            openDeleteDialog={openDeleteDialog}
                            openNegoMode={openNegoMode}
                        />
                    ))
                ) : (
                    <BanpickListEmpty />
                )}
            </ListColumn>
            <ListColumn teamInfo={team2}>
                {checkLength(team2.pickList) ? (
                    team2.pickList.map((x, i) => (
                        <BanpickItem
                            team={2}
                            item={x}
                            idx={i}
                            changeBanStatus={changeBanStatus}
                            openEditDialog={openEditDialog}
                            openDeleteDialog={openDeleteDialog}
                            openNegoMode={openNegoMode}
                        />
                    ))
                ) : (
                    <BanpickListEmpty />
                )}
            </ListColumn>
        </BanpickListContainer>
    );
};

export default BanpickList;
