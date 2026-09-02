import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { AlertDialog, Button, ModalType } from "@streaming-tools/ui";
import styles from "./Control.module.css";

type Props = {
    type: number;
    title: string;
    num: number;
    add: () => void;
    sub: () => void;
};

export const Control = ({ type, title, num, add, sub }: Props) => {
    const { openDialog, closeDialog } = useContext(ModalContext);

    const openDescription = (type: number) => {
        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: title,
            body: (
                <AlertDialog
                    cancelLabel={"확인"}
                    onCancel={closeDialog}
                    message={
                        type === 0
                            ? "각 팀이 수행하는 전체 픽 수입니다. (예: 7이면 모든 페이즈가 끝났을 때 7번씩 픽을 수행하게 됩니다)"
                            : type === 1
                            ? "각 팀이 한 페이즈에 수행할 수 있는 픽 수입니다"
                            : "각 페이즈에서 픽이 끝나고 스트리머가 수행할 수 있는 팀 당 밴의 개수입니다"
                    }
                />
            ),
            footer: undefined,
        });
    };

    return (
        <section className={styles.stack}>
            <div className="flex items-center justify-center gap-2">
                {title}&nbsp;
                <Button variant="icon" className="cursor-pointer text-blue-300" onClick={() => openDescription(type)} aria-label={`${title} 설명`}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                </Button>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button className={styles.button} onClick={sub}>-</Button>
                <div className={styles.value}>{num}</div>
                <Button className={styles.button} onClick={add}>+</Button>
            </div>
        </section>
    );
};
