import React, { useEffect, useRef, useState } from "react";
import { MiniButton } from "../../../commonStyle/global.style";
import { TimerRow, TimerValue, TimerWrapper } from "./timer.style";
import TimerWorkerScript from "./timer.worker";

const Timer = () => {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [ms, setMs] = useState(0);
    const [play, setPlay] = useState(false);
    const [pause, setPause] = useState(false);

    const [time, setTime] = useState(0);
    const [timerObjectId, setObjectId] = useState<NodeJS.Timeout | null>(null);
    const [timerUpDown, setTimerUpDown] = useState(false);
    // const worker = useRef<Worker>(
    //     new Worker(`${process.env.REACT_APP_PUBLIC_URL}/worker/timer.worker.js`)
    // );
    const worker = useRef<Worker>(new Worker(TimerWorkerScript));

    useEffect(() => {
        worker.current.onmessage = (ev) => {
            // 시간 받아서 업데이트
            const time = ev.data;
            setMin(time / 60);
            setSec(time % 60);
            // setMs(time % 10);
        };
    }, []);

    useEffect(() => {
        updateTime();
    }, [min, ms, sec]);

    const startTimer = () => {
        worker.current.postMessage("start");
    };

    const stopTimer = () => {
        worker.current.postMessage("stop");
    };

    const resetTimer = () => {
        worker.current.postMessage("reset");
    };

    const editMin = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const min = parseInt(ev.target.value);
        setMin(min);
    };

    const editSec = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const sec = parseInt(ev.target.value);
        setSec(sec);
    };

    const editMs = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const ms = parseInt(ev.target.value);
        setMs(ms);
    };

    const updateTime = () => {
        const timeval = min * 60 + sec; // + ms;
        // worker.current.postMessage("change " + timeval.toString());
    };

    return (
        <TimerWrapper>
            <TimerRow>
                <TimerValue>{min < 10 ? "0" + Math.floor(min) : Math.floor(min)}</TimerValue>
                <TimerValue>:</TimerValue>
                <TimerValue>{sec < 10 ? "0" + Math.floor(sec) : Math.floor(sec)}</TimerValue>
                {/* <TimerValue>.</TimerValue>
                <TimerValue>{Math.floor(ms)}</TimerValue> */}
            </TimerRow>
            <TimerRow>
                <MiniButton onClick={startTimer}>START</MiniButton>
                <MiniButton onClick={stopTimer}>STOP</MiniButton>
                <MiniButton onClick={resetTimer}>RESET</MiniButton>
            </TimerRow>
        </TimerWrapper>
    );
};

export default Timer;
