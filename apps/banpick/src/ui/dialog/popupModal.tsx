import { useContext } from "react";
import { ModalContext } from "../../lib/context/modalProvider";
import {
    DialogOuter,
    DialogContainer,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "./modal.style";
import Portal from "./portal";

const PopupModal = () => {
    const { data } = useContext(ModalContext);
    return (
        <Portal domid="#dialog">
            <DialogOuter active={data.active}>
                <DialogContainer width={data.width} maxWidth={data.maxWidth}>
                    <DialogHeader>{data.header}</DialogHeader>
                    <DialogBody>{data.body}</DialogBody>
                    <DialogFooter>{data.footer}</DialogFooter>
                </DialogContainer>
            </DialogOuter>
        </Portal>
    );
};

export default PopupModal;
