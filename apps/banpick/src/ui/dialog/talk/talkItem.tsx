import { useContext } from "react";
import useSpeech from "../../../core/speech/useSpeech";
import { Message } from "../../../data/message";
import { emptyUser, UserType } from "../../../data/user";
import { StatusContext } from "../../../lib/context/statusProvider";
import { TalkContext } from "../../../lib/context/talkProvider";
import { TeamContext } from "../../../lib/context/teamProvider";
import styles from "../../pref/legacy.module.css";

type Props = {
    pickedUser: UserType;
    msg: Message;
};

const TalkItem = ({ pickedUser, msg }: Props) => {
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
            {!negoMode && <button className={styles.button} onClick={addToPickList}>선택하기</button>}
        </div>
    );
};

export default TalkItem;
