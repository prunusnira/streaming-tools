import { useState } from "react";
import { Phase } from "../../data/phase";

export type IBanpickData = {
    allPick: number;
    setAllPick: (n: number) => void;
    turnPick: number;
    setTurnPick: (n: number) => void;
    turnBan: number;
    setTurnBan: (n: number) => void;
    isStarted: boolean;
    setStart: (n: boolean) => void;
    isEntering: boolean;
    setEnter: (n: boolean) => void;
    showUsers: boolean;
    setShow: (n: boolean) => void;
    isNegoMode: boolean;
    setNegoMode: (n: boolean) => void;
    phase: Phase;
    setPhase: (n: Phase) => void;
    reset: () => void;
};

const useBanpickData = () => {
    const [allPick, setAllPick] = useState(7);
    const [turnPick, setTurnPick] = useState(3);
    const [turnBan, setTurnBan] = useState(1);

    const [isStarted, setStart] = useState(false);
    const [isEntering, setEnter] = useState(false);
    const [showUsers, setShow] = useState(false);
    const [isNegoMode, setNegoMode] = useState(false);

    const [phase, setPhase] = useState(Phase.READY);

    const reset = () => {
        setAllPick(7);
        setTurnPick(3);
        setTurnBan(1);
        setStart(false);
        setEnter(false);
        setShow(true);
        setNegoMode(false);
        setPhase(Phase.READY);
    };

    const bp: IBanpickData = {
        allPick,
        setAllPick,
        turnPick,
        setTurnPick,
        turnBan,
        setTurnBan,
        isStarted,
        setStart,
        isEntering,
        setEnter,
        showUsers,
        setShow,
        isNegoMode,
        setNegoMode,
        phase,
        setPhase,
        reset,
    };

    return {
        banpickData: bp,
    };
};

export default useBanpickData;
