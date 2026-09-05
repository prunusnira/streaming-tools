import { useContext } from "react";
import { Button, cn } from "@streaming-tools/ui";
import styles from "./BanpickItem.module.css";
import { Message } from "@banpick/features/banpick/model/message";
import { Phase } from "@banpick/features/banpick/model/status";
import { StatusContext } from "@banpick/features/banpick/model/StatusProvider";

type Props = {
    team: number;
    item: Message;
    idx: number;
    changeBanStatus: (tn: number, idx: number) => void;
    openEditDialog: (teamNum: number, idx: number, msg: Message) => void;
    openDeleteDialog: (teamNum: number, idx: number) => void;
    openNegoMode: (id: string) => void;
};

export const BanpickItem = ({
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
                <Button className={styles.button} onClick={() => openEditDialog(team, idx, item)}>
                    수정
                </Button>
                <Button className={styles.button} onClick={() => openDeleteDialog(team, idx)}>
                    삭제
                </Button>
                <Button className={styles.button} onClick={() => openNegoMode(item.id)}>
                    협상
                </Button>
                <Button
                    className={styles.button}
                    disabled={data.phase !== Phase.Ban}
                    onClick={() => changeBanStatus(team, idx)}
                >
                    {item.ban && "언밴"}
                    {!item.ban && "밴"}
                </Button>
            </div>
        </article>
    );
};
