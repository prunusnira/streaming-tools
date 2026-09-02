import { type MouseEvent, useContext } from "react";
import { cn } from "@streaming-tools/ui";
import styles from "./TeamItem.module.css";
import { UserType } from "@banpick/features/streamer/model/user";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";

type Props = {
    children: React.ReactNode;
    picked: UserType;
    changePickedState: () => void;
};

export const TeamItem = ({ children, picked, changePickedState }: Props) => {
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
