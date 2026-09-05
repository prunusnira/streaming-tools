import { useContext } from "react";
import { Button } from "@streaming-tools/ui";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import styles from "./TalkDialogFooter.module.css";

type Props = {
    skipDialog: () => void;
    cancelDialog: () => void;
};

export const TalkDialogFooter = ({ skipDialog, cancelDialog }: Props) => {
    const { negoMode } = useContext(TalkContext);
    return (
        <div className="flex gap-2">
            {!negoMode && (
                <Button className={styles.primaryButton} onClick={skipDialog}>
                    스킵
                </Button>
            )}
            <Button className={styles.primaryButton} onClick={cancelDialog}>
                취소
            </Button>
        </div>
    );
};
