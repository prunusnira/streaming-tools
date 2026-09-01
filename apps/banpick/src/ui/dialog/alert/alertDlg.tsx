import { ModalType } from "../../../data/modal";
import styles from "../../pref/legacy.module.css";

type Props = {
    msg: string;
    btn: string;
    closeDialog: () => void;
    type?: ModalType;
    btnOk?: string;
    ok?: () => void;
};

const AlertDialog = ({ msg, type, btn, btnOk, ok, closeDialog }: Props) => {
    return (
        <section className={styles.stack}>
            <p className={styles.alertText}>{msg}</p>
            <div className="flex justify-center gap-2">
                {type === ModalType.TwoBtn && <button className={styles.primaryButton} onClick={ok}>{btnOk}</button>}
                <button className={styles.primaryButton} onClick={closeDialog}>{btn}</button>
            </div>
        </section>
    );
};

export default AlertDialog;
