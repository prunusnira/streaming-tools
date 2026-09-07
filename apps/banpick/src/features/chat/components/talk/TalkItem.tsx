import { useContext } from "react";
import { Button } from "@streaming-tools/ui";
import { useSpeech } from "@banpick/features/chat/logic/speech/useSpeech";
import { Message } from "@banpick/features/banpick/model/message";
import { emptyUser, UserType } from "@banpick/features/streamer/model/user";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { TeamContext } from "@banpick/features/banpick/model/TeamProvider";
import styles from "./TalkItem.module.css";

type Props = {
    pickedUser: UserType;
    msg: Message;
};

export const TalkItem = ({ pickedUser, msg }: Props) => {
    const { team1, team2, updateTeam1, updateTeam2, userList, updateUserList } =
        useContext(TeamContext);
    const { closeTalkDialog, changePickedUser, negoMode } = useContext(TalkContext);

    const { speech } = useSpeech();

    const addToPickList = () => {
        if (pickedUser.team === 1) {
            team1.pickList.push(msg);
            team1.curPick++;
            updateTeam1(team1);
        }
        if (pickedUser.team === 2) {
            team2.pickList.push(msg);
            team2.curPick++;
            updateTeam2(team2);
        }

        const idx = userList.findIndex((x) => x.userid === pickedUser.userid);
        userList[idx].picked = true;
        updateUserList(userList);
        speech(msg.msg);
        changePickedUser(emptyUser);

        closeTalkDialog();
    };

    return (
        <div className={styles.talkItem}>
            <div className={styles.stack}>
                <div>{msg.msg}</div>
                <div className="text-xs text-slate-500">{msg.timeInTxt}</div>
            </div>
            {!negoMode && (
                <Button className={styles.button} onClick={addToPickList}>
                    선택하기
                </Button>
            )}
        </div>
    );
};
