import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const DeleteBtnWrapper = createComponent("div", "flex gap-2");
export const DeleteButton = createComponent("button", styles.button);
