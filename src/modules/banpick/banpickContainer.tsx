import React from "react";
import User from "../../data/user";
import Team from "../../data/team";
import BanPickEditor from "./banpickEditor";
import useBanPick from "./useBanPick";
import useBanpickData, { IBanpickData } from "../main/useBanpickData";
import { BanPickRemoveModal } from "./banpickRemoveModal";
import BanPickPresenter from "./banpickPresenter";

interface Props {
    team: Team;
    banpickData: IBanpickData;
}

const BanPickContainer = ({ team, banpickData }: Props) => {
    const {
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
    } = useBanPick({ team });

    // 밴 or 언밴 하기
    const banPick = (idx: number) => {
        if (team.pickList[idx].ban) {
            team.pickList[idx].ban = false;
            team.cban--;
        } else {
            // 밴 하기 전에 현재 밴 수 확인
            if (team.cban >= banpickData.turnBan) {
                // 밴 횟수 초과 상태 알림
                // banOverAlertOpen(team.teamName, team.teamNum);
            } else {
                team.pickList[idx].ban = true;
                team.cban++;
            }
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
            <BanPickPresenter
                pickList={pickList}
                teamName={team.teamName}
                teamNum={team.teamNum}
                edit={editMessage}
                openRemove={openRemove}
                ban={banPick}
                nego={openNego}
            />
            <BanPickEditor
                team={team}
                msg={editMsg}
                display={editDlg}
                idx={editIdx}
                close={closeEdit}
            />
            <BanPickRemoveModal
                removeDlg={removeDlg}
                selected={removeIdx}
                removePick={removeMessage}
                close={closeRemove}
            />
        </>
    );
};

export default BanPickContainer;
