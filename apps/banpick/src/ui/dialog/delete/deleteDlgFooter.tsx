import styles from "../../pref/legacy.module.css";

type Props = {
    team: number;
    idx: number;
    deleteMessage: (team: number, idx: number) => void;
    closeDialog: () => void;
};

const DeleteDlgFooter = ({ team, idx, deleteMessage, closeDialog }: Props) => {
    return (
        <div className="flex gap-2">
            <button className={styles.button} onClick={closeDialog}>아니오</button>
            <button className={styles.button} onClick={() => deleteMessage(team, idx)}>네</button>
        </div>
    );
};

export default DeleteDlgFooter;
