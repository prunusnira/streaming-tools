import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BPButton } from "../../../commonStyle/global.style";
import {
    getTeam,
    reset,
    setAllPickSize,
    setShowUsers,
    setStart,
} from "../../../redux/banpickSlice";
import { RootState } from "../../../redux/reducer";
import {
    ControlBtnArea,
    ControlBtnRow,
    ControlButton,
    ControlSelBottom,
    ControlSelBtn,
    ControlSelectArea,
    ControlSelector,
    ControlSelNum,
    ControlSelTitle,
    ControlWrapper,
} from "./control.style";

const Control = () => {
    const { allPick, turnPick, turnBan, isStarted, gettingUsers, showUsers } = useSelector(
        (state: RootState) => state.banpick
    );
    const dispatch = useDispatch();

    return (
        <ControlWrapper>
            <ControlBtnArea>
                {(function () {
                    if (!isStarted) {
                        return (
                            <BPButton
                                onClick={() => {
                                    dispatch({
                                        type: setStart,
                                        payload: true,
                                    });
                                    dispatch({
                                        type: gettingUsers,
                                        payload: true,
                                    });
                                }}
                            >
                                인원 모집 시작
                            </BPButton>
                        );
                    } else if (isStarted && gettingUsers) {
                        return (
                            <BPButton
                                onClick={() =>
                                    dispatch({
                                        type: getTeam,
                                        payload: false,
                                    })
                                }
                            >
                                인원 그만 받기
                            </BPButton>
                        );
                    } else if (isStarted && !gettingUsers) {
                        return (
                            <BPButton
                                onClick={() =>
                                    dispatch({
                                        type: getTeam,
                                        payload: true,
                                    })
                                }
                            >
                                인원 더 받기
                            </BPButton>
                        );
                    }
                })()}
                <ControlBtnRow>
                    <BPButton onClick={() => dispatch({ type: reset })}>리셋</BPButton>
                    <BPButton onClick={() => dispatch({ type: setShowUsers, payload: !showUsers })}>
                        팀원표시
                    </BPButton>
                </ControlBtnRow>
            </ControlBtnArea>

            <ControlSelectArea>
                <ControlSelector>
                    <ControlSelTitle>팀 전체 픽</ControlSelTitle>
                    <ControlSelBottom>
                        <ControlSelBtn
                            onClick={() => dispatch({ type: setAllPickSize, payload: allPick - 1 })}
                        >
                            -
                        </ControlSelBtn>
                        <ControlSelNum type="number" value={allPick} />
                        <ControlSelBtn
                            onClick={() => dispatch({ type: setAllPickSize, payload: allPick + 1 })}
                        >
                            +
                        </ControlSelBtn>
                    </ControlSelBottom>
                </ControlSelector>

                <ControlSelector>
                    <ControlSelTitle>턴당 픽</ControlSelTitle>
                    <ControlSelBottom>
                        <ControlSelBtn
                            onClick={() =>
                                dispatch({ type: setAllPickSize, payload: turnPick - 1 })
                            }
                        >
                            -
                        </ControlSelBtn>
                        <ControlSelNum type="number" value={turnPick} />
                        <ControlSelBtn
                            onClick={() =>
                                dispatch({ type: setAllPickSize, payload: turnPick + 1 })
                            }
                        >
                            +
                        </ControlSelBtn>
                    </ControlSelBottom>
                </ControlSelector>

                <ControlSelector>
                    <ControlSelTitle>턴당 밴</ControlSelTitle>
                    <ControlSelBottom>
                        <ControlSelBtn
                            onClick={() => dispatch({ type: setAllPickSize, payload: turnBan - 1 })}
                        >
                            -
                        </ControlSelBtn>
                        <ControlSelNum type="number" value={turnBan} />
                        <ControlSelBtn
                            onClick={() => dispatch({ type: setAllPickSize, payload: turnBan - 1 })}
                        >
                            +
                        </ControlSelBtn>
                    </ControlSelBottom>
                </ControlSelector>
            </ControlSelectArea>
        </ControlWrapper>
    );
};

export default Control;
