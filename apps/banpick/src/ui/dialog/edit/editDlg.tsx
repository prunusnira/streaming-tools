import { type ChangeEvent, useState } from "react";
import { Message } from "../../../data/message";
import styles from "../../pref/legacy.module.css";

type Props = {
    teamNum: number;
    idx: number;
    msg: Message;
    editText: (teamNum: number, idx: number, text: string) => void;
    closeDialog: () => void;
};

const EditDlg = ({ teamNum, idx, msg, editText, closeDialog: closeTalkDlg }: Props) => {
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
                <button className={styles.primaryButton} onClick={closeTalkDlg}>취소</button>
                <button className={styles.primaryButton} onClick={() => editText(teamNum, idx, text)}>수정</button>
            </div>
        </section>
    );
};

export default EditDlg;
