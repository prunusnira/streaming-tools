import React from "react";
import {
    DialogBody,
    DialogContainer,
    DialogFooter,
    DialogHeader,
    DialogOuter,
} from "../commonStyle/dialog.style";
import Portal from "./portal";

type Props = {
    width: number | string;
    maxWidth: number;
    active: boolean;
    header: React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
};

const Popup = ({ width, maxWidth, active, header, body, footer }: Props) => {
    return (
        <Portal domid="#dialog">
            <DialogOuter active={active}>
                <DialogContainer width={width} maxWidth={maxWidth}>
                    <DialogHeader>{header}</DialogHeader>
                    <DialogBody>{body}</DialogBody>
                    <DialogFooter>{footer}</DialogFooter>
                </DialogContainer>
            </DialogOuter>
        </Portal>
    );
};

export default Popup;
