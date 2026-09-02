import { useEffect, useRef, useState } from "react";
import { UserType } from "@banpick/features/streamer/model/user";
import { convertMStoSec } from "./convertMStoSec";
import styles from "./TalkDialogHeader.module.css";

type Props = {
    active: boolean;
    user: UserType;
    initTime: number;
};

export const TalkDialogHeader = ({ active, user, initTime }: Props) => {
    const [timerNum, setTimerNum] = useState(0);
    const timer = useRef<Array<NodeJS.Timeout>>([]);

    useEffect(() => {
        active &&
            timer.current.push(
                setInterval(() => {
                    setTimerNum(convertMStoSec(Date.now() - initTime));
                }, 1000)
            );

        !active && stopTimer();
    }, [initTime, active]);

    const stopTimer = () => {
        timer.current.forEach((x) => {
            clearInterval(x);
        });
        setTimerNum(0);
    };

    return (
        <section className="flex justify-between gap-4">
            <div className="flex items-center gap-3">
                <img className={styles.titleIcon} src={user.iconurl} alt="사용자 프로필" />
                <div className="font-medium">{user.displayname}</div>
                <div className="text-sm text-slate-400">({user.userid})</div>
            </div>
            <div className="text-sm text-slate-400">{timerNum} 초</div>
        </section>
    );
};
