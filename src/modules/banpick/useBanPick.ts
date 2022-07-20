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

    const [negoDlg, setNegoDlg] = useState(false);
    const [negoUser, setNegoUser] = useState(emptyUser);
    const [negoMessage, setNegoMessage] = useState(emptyMessage);

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

    const openNego = (userid: string) => {
        // 사용자 아이디 -> 사용자 리스트에서 정보 가져옴 -> lastChat 설정
        // setNegoUser(getMember(teamNum, message.id));
        // setNegoMessage(message);
        setNegoDlg(true);
    };

    const closeNego = () => {
        setNegoDlg(false);
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

        negoUser,
        negoMessage,
        openNego,
        closeNego,
    };
};

export default useBanPick;
