import React from "react";
import { useSelector } from "react-redux";
import { MiniButton } from "../../commonStyle/global.style";
import Message, { getFormatDate } from "../../data/message";
import { Phase } from "../../data/phase";
import Team from "../../data/team";
import { RootState } from "../../redux/reducer";
import { IBanpickData } from "../main/useBanpickData";

import {
    BanPickWrapper,
    BanPickTitle,
    BanPickBody,
    BPMessage,
    BPName,
    BPNum,
    BPTime,
    BPWrapper,
    BPButtonWrapper,
    BPMidBot,
    BPMid,
    BPMidUp,
    BPRow,
} from "./banpick.style";

interface Props {
    pickList: Array<Message>;
    team: Team;
    teamList: Array<string>;
    banpickData: IBanpickData;
    edit: (msg: Message, idx: number) => void;
    openRemove: (idx: number) => void;
    ban: (idx: number) => void;
    nego: (msg: Message) => void;
}

const BanPickPresenter = ({
    pickList,
    team,
    teamList,
    banpickData,
    edit,
    openRemove,
    ban,
    nego,
}: Props) => {
    const { phase } = banpickData;
    return (
        <BanPickWrapper>
            <BanPickTitle>
                <BPRow fontBig={true}>
                    {team.teamName} ({teamList.length} 명)
                </BPRow>
                <BPRow>
                    {banpickData.phase === Phase.PICK &&
                        `이번 페이즈 Pick ${team.cpick} / ${banpickData.turnPick}`}
                    {banpickData.phase === Phase.BAN &&
                        `이번 페이즈 Ban ${team.cban} / ${banpickData.turnBan}`}
                </BPRow>
            </BanPickTitle>
            <BanPickBody id={`banpick-box${team.teamNum}`} className="banpicklist-body">
                {pickList.map((v, i) => {
                    return (
                        <BPWrapper>
                            <BPNum>PICK {i + 1}</BPNum>
                            <BPMid>
                                <BPMidUp>
                                    <BPMessage>{v.ban ? <del>{v.msg}</del> : v.msg}</BPMessage>
                                </BPMidUp>
                                <BPMidBot>
                                    <BPTime>{getFormatDate(v.time)}</BPTime>
                                    <BPName>
                                        {v.name} ({v.id})
                                    </BPName>
                                </BPMidBot>
                            </BPMid>
                            <BPButtonWrapper>
                                <MiniButton onClick={() => edit(v, i)}>수정</MiniButton>
                                <MiniButton onClick={() => openRemove(i)}>삭제</MiniButton>
                                {phase === Phase.PICK && v.ban ? (
                                    <MiniButton disabled>언밴</MiniButton>
                                ) : phase === Phase.PICK && !v.ban ? (
                                    <MiniButton disabled>밴</MiniButton>
                                ) : phase === Phase.BAN && v.ban ? (
                                    <MiniButton onClick={() => ban(i)}>언밴</MiniButton>
                                ) : phase === Phase.BAN && !v.ban ? (
                                    <MiniButton onClick={() => ban(i)}>밴</MiniButton>
                                ) : (
                                    <MiniButton disabled>밴</MiniButton>
                                )}
                                <MiniButton onClick={() => nego(v)}>협테</MiniButton>
                            </BPButtonWrapper>
                        </BPWrapper>
                    );
                })}
            </BanPickBody>
        </BanPickWrapper>
    );
};

export default BanPickPresenter;
