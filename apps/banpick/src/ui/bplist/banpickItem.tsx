import { useContext } from "react";
import { cn } from "@streaming-tools/ui";
import styles from "../pref/legacy.module.css";
import { Message } from "../../data/message";
import { Phase } from "../../data/status";
import { StatusContext } from "../../lib/context/statusProvider";

type Props = {
    team: number;
    item: Message;
    idx: number;
    changeBanStatus: (tn: number, idx: number) => void;
    openEditDialog: (teamNum: number, idx: number, msg: Message) => void;
    openDeleteDialog: (teamNum: number, idx: number) => void;
    openNegoMode: (id: string) => void;
};

const BanpickItem = ({
    team,
    item,
    idx,
    changeBanStatus,
    openEditDialog,
    openDeleteDialog,
    openNegoMode,
}: Props) => {
    const { data } = useContext(StatusContext);
    return (
        <article className={styles.item}>
            <div className={styles.itemTitle}>
                <div>PICK {idx + 1}</div>
                <div>by {item.name}</div>
            </div>
            <div className={styles.row}>
                <div className={cn(styles.itemContent, item.ban && styles.banned)}>{item.msg}</div>
            </div>
            <div className="text-sm text-slate-400">{item.timeInTxt}</div>
            <div className={styles.itemButtons}>
                <button className={styles.button} onClick={() => openEditDialog(team, idx, item)}>수정</button>
                <button className={styles.button} onClick={() => openDeleteDialog(team, idx)}>삭제</button>
                <button className={styles.button} onClick={() => openNegoMode(item.id)}>협상</button>
                <button className={styles.button}
                    disabled={data.phase !== Phase.Ban}
                    onClick={() => changeBanStatus(team, idx)}
                >
                    {item.ban && "언밴"}
                    {!item.ban && "밴"}
                </button>
            </div>
        </article>
    );
};

export default BanpickItem;
