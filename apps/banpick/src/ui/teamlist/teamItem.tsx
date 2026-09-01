import { type MouseEvent, useContext } from "react";
import { cn } from "@streaming-tools/ui";
import styles from "../pref/legacy.module.css";
import { UserType } from "../../data/user";
import { TalkContext } from "../../lib/context/talkProvider";

type Props = {
    children: React.ReactNode;
    picked: UserType;
    changePickedState: () => void;
};

const TeamItem = ({ children, picked, changePickedState }: Props) => {
    const { openTalkDialog, changeNegoMode, changePickedUser } = useContext(TalkContext);
    return (
        <div
            className={cn(styles.teamItem, picked.picked && styles.banned)}
            onClick={changePickedState}
            onContextMenu={(event: MouseEvent<HTMLDivElement>) => {
                // 해당 유저에 대한 컨텍스트 메뉴 열기
                event.preventDefault();
                changeNegoMode(true);
                changePickedUser(picked);
                openTalkDialog();
            }}
        >
            {children}
        </div>
    );
};

export default TeamItem;
