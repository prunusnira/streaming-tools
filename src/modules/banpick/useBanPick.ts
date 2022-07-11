import { useState } from "react";
import Message, { emptyMessage } from "../../data/message";
import User, { emptyUser } from "../../data/user";
import Team from "../../data/team";

type Props = {
    team: Team;
    getMember: (teamNum: number, id: string) => User;
};

const useBanPick = ({ team, getMember }: Props) => {
    const [pickList, setPickList] = useState<Array<Message>>([]);
    const [editDlg, setEditDlg] = useState(false);
    const [editMsg, setEditMsg] = useState(emptyMessage);
    const [editIdx, setEditIdx] = useState(0);
    const [removeDlg, setRemoveDlg] = useState(false);
    const [removeIdx, setRemoveIdx] = useState(-1);
    const [negoDlg, setNegoDlg] = useState(false);
    const [negoUser, setNegoUser] = useState(emptyUser);
    const [negoMessage, setNegoMessage] = useState(emptyMessage);

    const addNewPick = (message: Message) => {
        setPickList([...pickList, message]);
    };

    const getMessage = (idx: number) => {
        return pickList[idx];
    };

    const editMessage = (idx: number) => {
        setEditMsg(getMessage(idx));
        setEditIdx(idx);
        setEditDlg(true);
    };

    const closeEdit = () => {
        setEditDlg(false);
    };
    const removeMessage = (idx: number) => {
        pickList.splice(idx, 1);
        closeRemove();
    };

    const closeRemove = () => {
        setRemoveDlg(false);
        setRemoveIdx(-1);
    };

    const openNego = (teamNum: number, message: Message) => {
        setNegoUser(getMember(teamNum, message.id));
        setNegoMessage(message);
        setNegoDlg(true);
    };

    const closeNego = () => {
        setNegoDlg(false);
    };

    return {
        pickList,
        addNewPick,
        getMessage,
        editMessage,
        closeEdit,
        removeMessage,

        editDlg,
        editMsg,
        editIdx,

        negoUser,
        negoMessage,
        openNego,
        closeNego,
    };
};

export default useBanPick;
