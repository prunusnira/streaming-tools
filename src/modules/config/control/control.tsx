import React from "react";
import { LightBlue, White } from "../../../commonStyle/color";
import { BPButton, MiniButton, BtnWrapper } from "../../../commonStyle/global.style";
import { Phase } from "../../../data/phase";
import { IBanpickData } from "../../main/useBanpickData";
import {
    ControlBtnArea,
    ControlBtnRow,
    ControlSelBottom,
    ControlSelectArea,
    ControlSelector,
    ControlSelNum,
    ControlSelTitle,
    ControlWrapper,
} from "./control.style";

type Props = {
    banpickData: IBanpickData;
};

const Control = ({ banpickData }: Props) => {
    const {
        isStarted,
        setStart,
        isEntering,
        setEnter,
        showUsers,
        setShow,
        allPick,
        setAllPick,
        turnBan,
        setTurnBan,
        turnPick,
        setTurnPick,
        setPhase,
        reset,
    } = banpickData;

    return (
        <ControlWrapper>
            <ControlBtnArea>
                <BtnWrapper width={300}>
                    {(function () {
                        if (!isStarted) {
                            return (
                                <BPButton
                                    onClick={() => {
                                        setStart(true);
                                        setEnter(true);
                                        setPhase(Phase.PICK);
                                    }}
                                    color={White}
                                    bgColor={LightBlue}
                                >
                                    인원 모집 시작
                                </BPButton>
                            );
                        } else if (isStarted && isEntering) {
                            return (
                                <BPButton
                                    onClick={() => setEnter(false)}
                                    color={White}
                                    bgColor={LightBlue}
                                >
                                    인원 그만 받기
                                </BPButton>
                            );
                        } else if (isStarted && !isEntering) {
                            return (
                                <BPButton
                                    onClick={() => setEnter(true)}
                                    color={White}
                                    bgColor={LightBlue}
                                >
                                    인원 더 받기
                                </BPButton>
                            );
                        }
                    })()}
                </BtnWrapper>
                <ControlBtnRow>
                    <BtnWrapper width={150}>
                        <BPButton onClick={() => reset()} disabled={!isStarted}>
                            리셋
                        </BPButton>
                    </BtnWrapper>
                    <BtnWrapper width={150}>
                        <BPButton onClick={() => setShow(!showUsers)}>
                            {showUsers ? "팀원 가리기" : "팀원 표시하기"}
                        </BPButton>
                    </BtnWrapper>
                </ControlBtnRow>
            </ControlBtnArea>

            <ControlSelectArea>
                <ControlSelector>
                    <ControlSelTitle>팀 전체 픽</ControlSelTitle>
                    <ControlSelBottom>
                        <MiniButton onClick={() => allPick > 1 && setAllPick(allPick - 1)}>
                            -
                        </MiniButton>
                        <ControlSelNum type="number" value={allPick} min={1} onChange={() => {}} />
                        <MiniButton onClick={() => setAllPick(allPick + 1)}>+</MiniButton>
                    </ControlSelBottom>
                </ControlSelector>

                <ControlSelector>
                    <ControlSelTitle>턴당 픽</ControlSelTitle>
                    <ControlSelBottom>
                        <MiniButton onClick={() => turnPick > 1 && setTurnPick(turnPick - 1)}>
                            -
                        </MiniButton>
                        <ControlSelNum type="number" value={turnPick} min={1} onChange={() => {}} />
                        <MiniButton onClick={() => setTurnPick(turnPick + 1)}>+</MiniButton>
                    </ControlSelBottom>
                </ControlSelector>

                <ControlSelector>
                    <ControlSelTitle>턴당 밴</ControlSelTitle>
                    <ControlSelBottom>
                        <MiniButton onClick={() => turnBan > 0 && setTurnBan(turnBan - 1)}>
                            -
                        </MiniButton>
                        <ControlSelNum type="number" value={turnBan} min={0} onChange={() => {}} />
                        <MiniButton onClick={() => setTurnBan(turnBan + 1)}>+</MiniButton>
                    </ControlSelBottom>
                </ControlSelector>
            </ControlSelectArea>
        </ControlWrapper>
    );
};

export default Control;
