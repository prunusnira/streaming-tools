import { useState } from "react";
import Message from "../../data/message";
import User from "../../data/user";
import Team from "../teamlist/team";

const useBanPick = (team: Team) => {
    const [pickList, setPickList] = useState<Array<Message>>([]);
    const [editDlg, setEditDlg] = useState(false);
    const [editMsg, setEditMsg] = useState(new Message("", "", ""));
    const [editIdx, setEditIdx] = useState(0);
    const [removeDlg, setRemoveDlg] = useState(false);
    const [removeIdx, setRemoveIdx] = useState(-1);
    const [negoDlg, setNegoDlg] = useState(false);
    const [negoUser, setNegoUser] = useState(new User("", "", false));
    const [negoMessage, setNegoMessage] = useState(new Message("", "", ""));

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

    const openNego = (message: Message) => {
        setNegoUser(team.getMember(message.getUserId()));
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
