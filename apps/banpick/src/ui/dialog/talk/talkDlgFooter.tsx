import { useContext } from "react";
import { TalkContext } from "../../../lib/context/talkProvider";
import styles from "../../pref/legacy.module.css";

type Props = {
    skipDialog: () => void;
    cancelDialog: () => void;
};

const TalkDlgFooter = ({ skipDialog, cancelDialog }: Props) => {
    const { negoMode } = useContext(TalkContext);
    return (
        <div className="flex gap-2">
            {!negoMode && <button className={styles.primaryButton} onClick={skipDialog}>스킵</button>}
            <button className={styles.primaryButton} onClick={cancelDialog}>취소</button>
        </div>
    );
};

export default TalkDlgFooter;
