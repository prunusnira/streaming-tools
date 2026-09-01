import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";
import { cn } from "@streaming-tools/ui";
import { createElement, type CSSProperties, type ReactNode } from "react";

type DialogOuterProps = {
    active: boolean;
    zIdx?: number;
    children?: ReactNode;
};

type DialogContainerProps = {
    width: number | string;
    maxWidth: number;
    children?: ReactNode;
};

export const DialogOuter = ({ active, zIdx, children }: DialogOuterProps) =>
    createElement("section", {
        className: cn(styles.dialogOuter, !active && styles.dialogHidden),
        style: zIdx ? { zIndex: zIdx } : undefined,
        children,
    });

export const DialogContainer = ({ width, maxWidth, children }: DialogContainerProps) =>
    createElement("section", {
        className: styles.dialogContainer,
        style: { width, maxWidth } as CSSProperties,
        children,
    });
export const DialogHeader = createComponent("div", styles.dialogHeader);
export const DialogBody = createComponent("div", styles.dialogBody);
export const DialogFooter = createComponent("div", styles.dialogFooter);
