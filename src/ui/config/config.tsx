import { useContext, useEffect } from "react";
import { Phase } from "../../data/status";
import { StatusContext } from "../../lib/context/statusProvider";
import { TeamContext } from "../../lib/context/teamProvider";
import {
    ConfButton,
    ConfigBtnGroup,
    ConfigContainer,
    ConfigCtrl,
    ConfigPhase,
    ConfigPhaseWrapper,
    ConfSButton,
    PhaseChangeBtn,
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
        changePhase,
        totalPickAdd,
        totalPickSub,
        phaseBanAdd,
        phaseBanSub,
        phasePickAdd,
        phasePickSub,
    } = useContext(StatusContext);
    const { team1, team2, updateTeam1, updateTeam2, resetTeam } = useContext(TeamContext);

    const forcePhaseChange = () => {
        if (data.phase === Phase.Pick) {
            changePhase(Phase.Ban);
            team1.curPick = 0;
            team2.curPick = 0;
            updateTeam1(team1);
            updateTeam2(team2);
        }
        if (data.phase === Phase.Ban) {
            changePhase(Phase.Pick);
            team1.curBan = 0;
            team2.curBan = 0;
            updateTeam1(team1);
            updateTeam2(team2);
        }
    };

    return (
        <ConfigContainer>
            <ConfigBtnGroup>
                <ConfSButton
                    run={data.run}
                    join={data.join}
                    onClick={() => {
                        !data.run && startup();
                        data.run && !data.join && resume();
                        data.run && data.join && pause();
                    }}
                >
                    {!data.run && "인원 모집 시작"}
                    {data.run && !data.join && "인원 모집 재개"}
                    {data.run && data.join && "인원 모집 중단"}
                </ConfSButton>
                <ConfButton
                    onClick={() => {
                        resetStatus();
                        resetTeam();
                    }}
                >
                    리셋
                </ConfButton>
                <ConfButton
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
            <ConfigPhaseWrapper>
                <ConfigPhase>
                    {data.phase === Phase.Ready && "READY"}
                    {data.phase === Phase.Pick && "PICK PHASE"}
                    {data.phase === Phase.Ban && "BAN PHASE"}
                </ConfigPhase>
                <PhaseChangeBtn
                    disabled={data.phase === Phase.Ready ? true : false}
                    onClick={forcePhaseChange}
                >
                    강제 페이즈 전환
                </PhaseChangeBtn>
            </ConfigPhaseWrapper>
        </ConfigContainer>
    );
};

export default Config;
