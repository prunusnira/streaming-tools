import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const ControlContainer = createComponent("section", styles.stack);
export const CtrlRow = createComponent("div", "flex items-center justify-center gap-2");
export const NumCtrl = createComponent("button", styles.button);
export const NumText = createComponent("div", "w-full text-center");
export const Help = createComponent("div", "cursor-pointer text-blue-300");
