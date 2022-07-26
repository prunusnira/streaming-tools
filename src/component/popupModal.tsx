import React, { useContext } from "react";
import {
    DialogBody,
    DialogContainer,
    DialogFooter,
    DialogHeader,
    DialogOuter,
} from "../commonStyle/dialog.style";
import { ModalContext } from "../context/modalContext";
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
