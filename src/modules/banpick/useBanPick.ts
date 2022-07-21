import { useState } from "react";
import Message, { emptyMessage } from "../../data/message";
import User, { emptyUser } from "../../data/user";
import Team from "../../data/team";

type Props = {
    team: Team;
};

const useBanPick = ({ team }: Props) => {
    const [pickList, setPickList] = useState<Array<Message>>(team.pickList);
    const [editDlg, setEditDlg] = useState(false);
    const [editMsg, setEditMsg] = useState(emptyMessage);
    const [editIdx, setEditIdx] = useState(0);

    const [removeDlg, setRemoveDlg] = useState(false);
    const [removeIdx, setRemoveIdx] = useState(-1);

    const editMessage = (msg: Message, idx: number) => {
        team.pickList[idx] = msg;
        setEditMsg(pickList[idx]);
        setEditIdx(idx);
        setEditDlg(true);
    };

    const closeEdit = () => {
        setEditDlg(false);
    };

    const openRemove = (idx: number) => {
        setRemoveIdx(idx);
        setRemoveDlg(true);
    };

    const removeMessage = (idx: number) => {
        team.pickList.splice(idx, 1);
        setPickList(team.pickList);
        closeRemove();
    };

    const closeRemove = () => {
        setRemoveDlg(false);
        setRemoveIdx(-1);
    };

    return {
        pickList,
        editMessage,
        closeEdit,
        removeMessage,
        openRemove,
        closeRemove,

        editDlg,
        editMsg,
        editIdx,

        removeDlg,
        removeIdx,
    };
};

export default useBanPick;
