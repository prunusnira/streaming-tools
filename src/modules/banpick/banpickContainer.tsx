import React, { useContext, useState } from "react";
import User from "../../data/user";
import Team from "../../data/team";
import useBanPick from "./useBanPick";
import { IBanpickData } from "../main/useBanpickData";
import BanPickPresenter from "./banpickPresenter";
import Message from "../../data/message";
import { BPButton } from "../../commonStyle/global.style";
import { PopupTitle, PopupBody, PopupFooter } from "../dialog/alertDialog/alertDialog.style";
import { ModalContext } from "../../context/modalContext";

interface Props {
    userList: Array<User>;
    team: Team;
    teamList: Array<string>;
    banpickData: IBanpickData;
    setTeamInfo: (tn: number, team: Team) => void;
    setDlgUser: (b: boolean) => void;
    setPicked: (u: User) => void;
    setChatList: (m: Array<Message>) => void;
    setNego: (b: boolean) => void;
    runRoulette: (tn: number) => void;
}

const BanPickContainer = ({
    userList,
    team,
    teamList,
    banpickData,
    setTeamInfo,
    setDlgUser,
    setPicked,
    setChatList,
    setNego,
    runRoulette,
}: Props) => {
    const [_, forceUpdate] = useState(0);
    const { editMessage, openRemove } = useBanPick({ team });
    const { openDialog, closeDialog } = useContext(ModalContext);

    // 밴 or 언밴 하기
    const banPick = (idx: number) => {
        const cteam = team;
        if (team.pickList[idx].ban) {
            cteam.pickList[idx].ban = false;
            cteam.cban--;
            setTeamInfo(team.teamNum, cteam);
        } else {
            // 밴 하기 전에 현재 밴 수 확인
            if (team.cban >= banpickData.turnBan) {
                // 밴 횟수 초과 상태 알림
                openDialog({
                    width: "480px",
                    maxWidth: 480,
                    active: true,
                    header: <PopupTitle>ⓘ 밴 횟수 초과 알림</PopupTitle>,
                    body: (
                        <PopupBody>
                            이번 페이즈에서 이 팀에 대해 밴을 할 수 있는 횟수를 초과했습니다
                        </PopupBody>
                    ),
                    footer: (
                        <PopupFooter>
                            <BPButton onClick={() => closeDialog()}>확인</BPButton>
                        </PopupFooter>
                    ),
                });
            } else {
                cteam.pickList[idx].ban = true;
                cteam.cban++;
                setTeamInfo(team.teamNum, cteam);
            }
        }
        forceUpdate((prevState) => prevState + 1);
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

    const openNego = (msg: Message) => {
        const user = userList.filter((x) => x.id === msg.id)[0];
        setPicked(user);
        setNego(true);
        setChatList([msg]);
        setDlgUser(true);
    };

    return (
        <BanPickPresenter
            team={team}
            teamList={teamList}
            banpickData={banpickData}
            edit={editMessage}
            openRemove={openRemove}
            ban={banPick}
            nego={openNego}
            runRoulette={runRoulette}
        />
    );
};

export default BanPickContainer;
