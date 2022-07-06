import React from "react";
import { useState } from "react";
import Message from "../../data/message";
import User from "../../data/user";
import UserDialog from "../dialog/userDialog/userdlg";
import Team from "../teamlist/team";
import BanPickEditor from "./banpickEditor";
import BanPickPresenter from "./banpickPresenter";
import { BanPickRemoveModal } from "./banpickRemoveModal";
import useBanPick from "./useBanPick";

interface Props {
    team: Team;
}

const BanPickContainer = ({ team }: Props) => {
    const {
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
    } = useBanPick(team);

    // 밴 or 언밴 하기
    const banPick = (idx: number) => {
        if (team.getOnePick(idx).getBanStatus()) {
            team.getOnePick(idx).undoBan();
            team.removeCurrentBan();
        } else {
            // 밴 하기 전에 현재 밴 수 확인
            // if (team.getCurrentBan() >= banNum) {
            //     // 밴 횟수 초과 상태
            //     banOverAlertOpen(team.getName(), team.getTeamNum());
            // } else {
            //     team.getOnePick(idx).setBan();
            //     team.addCurrentBan();
            // }
        }

        // 다음 페이즈 결정
        // phaseChange();
    };

    // 아래로 내리기
    const scrollToBottomChat = () => {
        document.getElementById("userchat")!.scrollTop =
            document.getElementById("userchat")!.scrollHeight;
    };

    const scrollToBottomPick = (teamnum: number) => {
        document.getElementById("banpick-box" + teamnum)!.scrollTop = document.getElementById(
            "banpick-box" + teamnum
        )!.scrollHeight;
    };

    return (
        <>
            {/* <BanPickPresenter
                pickList={pickList}
                teamName={team.getName()}
                teamNum={team.getTeamNum()}
                edit={changeEditMsg}
                openRemove={openRemovalPickModal}
                ban={banPick}
                nego={openNego}
            /> */}
            <BanPickEditor
                team={team}
                msg={editMsg}
                display={editDlg}
                idx={editIdx}
                close={closeEdit}
            />
            {/* <BanPickRemoveModal
                removeDlg={removeDlg}
                selected={removeIdx}
                removePick={removePick}
                close={closeRemove}
            />
            <UserDialog
                nego={true}
                team={team.getTeamNum()}
                user={negoUser}
                chat={[negoMessage]}
                display={false}
                use={() => {}}
            /> */}
        </>
    );
};

export default BanPickContainer;
