import { useContext, useEffect } from "react";
import { Phase } from "../../data/status";
import { StatusContext } from "../../lib/context/statusProvider";
import {
    ConfButton,
    ConfigBtnGroup,
    ConfigContainer,
    ConfigCtrl,
    ConfigPhase,
} from "./config.style";
import Control from "./control";

const Config = () => {
    const {
        data,
        startup,
        resume,
        pause,
        resetStatus,
        changeTeamVisible,
        totalPickAdd,
        totalPickSub,
        phaseBanAdd,
        phaseBanSub,
        phasePickAdd,
        phasePickSub,
    } = useContext(StatusContext);

    return (
        <ConfigContainer>
            <ConfigBtnGroup>
                <ConfButton
                    bgColor=""
                    onClick={() => {
                        !data.run && startup();
                        data.run && !data.join && resume();
                        data.run && data.join && pause();
                    }}
                >
                    {!data.run && "인원 모집 시작"}
                    {data.run && !data.join && "인원 모집 재개"}
                    {data.run && data.join && "인원 모집 중단"}
                </ConfButton>
                <ConfButton bgColor="" onClick={resetStatus}>
                    리셋
                </ConfButton>
                <ConfButton
                    bgColor=""
                    onClick={() => {
                        data.teamVisible ? changeTeamVisible(false) : changeTeamVisible(true);
                    }}
                >
                    {data.teamVisible && "팀원 목록 가리기"}
                    {!data.teamVisible && "팀원 목록 보이기"}
                </ConfButton>
            </ConfigBtnGroup>
            <ConfigCtrl>
                <Control
                    title={"픽(전체)"}
                    num={data.totalPick}
                    add={totalPickAdd}
                    sub={totalPickSub}
                />
                <Control
                    title={"픽(페이즈)"}
                    num={data.pickPhase}
                    add={phasePickAdd}
                    sub={phasePickSub}
                />
                <Control
                    title={"밴(페이즈)"}
                    num={data.banPhase}
                    add={phaseBanAdd}
                    sub={phaseBanSub}
                />
            </ConfigCtrl>
            <ConfigPhase>
                {data.phase === Phase.Ready && "READY"}
                {data.phase === Phase.Pick && "PICK PHASE"}
                {data.phase === Phase.Ban && "BAN PHASE"}
            </ConfigPhase>
        </ConfigContainer>
    );
};

export default Config;
