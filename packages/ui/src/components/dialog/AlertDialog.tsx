import { Button } from "../button/Button";
import { ModalType } from "./ModalType";
import styles from "./AlertDialog.module.css";

type AlertDialogProps = {
    message: string;
    cancelLabel: string;
    onCancel: () => void;
    type?: ModalType;
    confirmLabel?: string;
    onConfirm?: () => void;
};

export const AlertDialog = ({
    message,
    type,
    cancelLabel,
    confirmLabel,
    onConfirm,
    onCancel,
}: AlertDialogProps) => {
    return (
        <section className={styles.dialog}>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
                {type === ModalType.TwoBtn && (
                    <Button className={styles.primaryButton} onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                )}
                <Button className={styles.primaryButton} onClick={onCancel}>
                    {cancelLabel}
                </Button>
            </div>
        </section>
    );
};
