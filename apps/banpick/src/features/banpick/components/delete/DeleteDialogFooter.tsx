import { Button } from "@streaming-tools/ui";
import styles from "./DeleteDialogFooter.module.css";

type Props = {
    team: number;
    idx: number;
    deleteMessage: (team: number, idx: number) => void;
    closeDialog: () => void;
};

export const DeleteDialogFooter = ({ team, idx, deleteMessage, closeDialog }: Props) => {
    return (
        <div className="flex gap-2">
            <Button className={styles.button} onClick={closeDialog}>
                아니오
            </Button>
            <Button className={styles.button} onClick={() => deleteMessage(team, idx)}>
                네
            </Button>
        </div>
    );
};
