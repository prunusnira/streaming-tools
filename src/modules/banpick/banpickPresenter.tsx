import React from "react";
import { useSelector } from "react-redux";
import { MiniButton } from "../../commonStyle/global.style";
import Message, { getFormatDate } from "../../data/message";
import { RootState } from "../../redux/reducer";

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
} from "./banpick.style";

interface Props {
    pickList: Array<Message>;
    teamName: string;
    teamNum: number;
    edit: (msg: Message, idx: number) => void;
    openRemove: (idx: number) => void;
    ban: (idx: number) => void;
    nego: (userid: string) => void;
}

const BanPickPresenter = ({ pickList, teamName, teamNum, edit, openRemove, ban, nego }: Props) => {
    const { phase } = useSelector((state: RootState) => state.banpick);

    return (
        <BanPickWrapper>
            <BanPickTitle>
                {teamName} (팀 {teamNum})
            </BanPickTitle>
            <BanPickBody id={`banpick-box${teamNum}`} className="banpicklist-body">
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
                                {phase === 1 && v.ban ? (
                                    <MiniButton disabled>언밴</MiniButton>
                                ) : phase === 1 && !v.ban ? (
                                    <MiniButton disabled>밴</MiniButton>
                                ) : phase === 2 && v.ban ? (
                                    <MiniButton onClick={() => ban(i)}>언밴</MiniButton>
                                ) : phase === 2 && !v.ban ? (
                                    <MiniButton onClick={() => ban(i)}>밴</MiniButton>
                                ) : (
                                    <MiniButton disabled>밴</MiniButton>
                                )}
                                <MiniButton onClick={() => nego(v.id)}>협테</MiniButton>
                            </BPButtonWrapper>
                        </BPWrapper>
                    );
                })}
            </BanPickBody>
        </BanPickWrapper>
    );
};

export default BanPickPresenter;
