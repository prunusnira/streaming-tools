import { createContext, useState } from "react";
import { Phase, StatusType } from "../../data/status";
import { emptyUser, UserType } from "../../data/user";

const initStatus: StatusType = {
    phase: Phase.Ready,
    totalPick: 0,
    pickPhase: 0,
    banPhase: 0,
    run: false,
    join: false,
    teamVisible: true,
};

export const StatusContext = createContext({
    data: initStatus,
    startup: () => {},
    pause: () => {},
    resume: () => {},
    resetStatus: () => {},
    changePhase: (phase: Phase) => {},
    changeTeamVisible: (v: boolean) => {},
    /////////
    totalPickAdd: () => {},
    totalPickSub: () => {},
    phasePickAdd: () => {},
    phasePickSub: () => {},
    phaseBanAdd: () => {},
    phaseBanSub: () => {},
});

type ProviderProps = {
    children: React.ReactNode;
};

const StatusProvider = ({ children }: ProviderProps) => {
    const [phase, setPhase] = useState(Phase.Ready);
    const [totalPick, setTotalPick] = useState(7);
    const [pickPhase, setPickPhase] = useState(3);
    const [banPhase, setBanPhase] = useState(1);
    const [run, setRun] = useState(false);
    const [join, setJoin] = useState(false);
    const [teamVisible, setTeamVisible] = useState(true);

    const startup = () => {
        setRun(true);
        setJoin(true);
        setPhase(Phase.Pick);
    };

    const pause = () => {
        setJoin(false);
    };

    const resume = () => {
        setJoin(true);
    };

    const resetStatus = () => {
        setRun(false);
        setJoin(false);
        setPickPhase(0);
        setBanPhase(0);
        setPhase(Phase.Ready);
    };

    const changePhase = (phase: Phase) => {
        setPhase(phase);
    };

    const changeTeamVisible = (visible: boolean) => {
        setTeamVisible(visible);
    };

    //////////////////////
    const totalPickAdd = () => {
        setTotalPick(totalPick + 1);
    };

    const totalPickSub = () => {
        totalPick > 0 && setTotalPick(totalPick - 1);
    };

    const phasePickAdd = () => {
        setPickPhase(pickPhase + 1);
    };

    const phasePickSub = () => {
        pickPhase > 0 && pickPhase > banPhase + 1 && setPickPhase(pickPhase - 1);
    };

    const phaseBanAdd = () => {
        setBanPhase(banPhase + 1);
    };

    const phaseBanSub = () => {
        banPhase > 0 && setBanPhase(banPhase - 1);
    };

    return (
        <StatusContext.Provider
            value={{
                data: {
                    phase,
                    totalPick,
                    pickPhase,
                    banPhase,
                    run,
                    join,
                    teamVisible,
                },
                startup,
                pause,
                resume,
                resetStatus,
                changePhase,
                changeTeamVisible,

                totalPickAdd,
                totalPickSub,
                phasePickAdd,
                phasePickSub,
                phaseBanAdd,
                phaseBanSub,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
};

export default StatusProvider;
