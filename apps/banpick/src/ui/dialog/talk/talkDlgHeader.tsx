import { useEffect, useRef, useState } from "react";
import { UserType } from "../../../data/user";
import { convertMStoSec } from "../../../lib/tool/convertMStoSec";
import {
    TalkDlgTitle,
    TalkHeaderContainer,
    TitleIcon,
    TitleId,
    TitleName,
    TitleTime,
} from "./talkDlgHeader.style";

type Props = {
    active: boolean;
    user: UserType;
    initTime: number;
};

const TalkDlgHeader = ({ active, user, initTime }: Props) => {
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
        <TalkHeaderContainer>
            <TalkDlgTitle>
                <TitleIcon src={user.iconurl} />
                <TitleName>{user.displayname}</TitleName>
                <TitleId>({user.userid})</TitleId>
            </TalkDlgTitle>
            <TitleTime>{timerNum} 초</TitleTime>
        </TalkHeaderContainer>
    );
};

export default TalkDlgHeader;
