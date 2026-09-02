import { type ChangeEvent, useState } from "react";
import { Button } from "@streaming-tools/ui";
import { Message } from "@banpick/features/banpick/model/message";
import styles from "./EditDialog.module.css";

type Props = {
    teamNum: number;
    idx: number;
    msg: Message;
    editText: (teamNum: number, idx: number, text: string) => void;
    closeDialog: () => void;
};

export const EditDialog = ({ teamNum, idx, msg, editText, closeDialog: closeTalkDialog }: Props) => {
    const [text, setText] = useState("");

    return (
        <section className={styles.stack}>
            <div className="flex flex-col gap-1 pb-5">
                <span className="text-sm text-slate-400">현재 내용:</span>
                <span>{msg.msg}</span>
            </div>
            <label className="flex flex-col gap-1 pb-5">
                <span className="text-sm text-slate-400">변경 내용:</span>
                <input className={styles.input}
                    value={text}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
                />
            </label>
            <div className="flex w-full justify-center gap-2">
                <Button className={styles.primaryButton} onClick={closeTalkDialog}>취소</Button>
                <Button className={styles.primaryButton} onClick={() => editText(teamNum, idx, text)}>수정</Button>
            </div>
        </section>
    );
};
