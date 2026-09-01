import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const AlertContainer = createComponent("section", styles.stack);
export const AlertTxt = createComponent("div", styles.alertText);
export const AlertBtnWrapper = createComponent("div", "flex justify-center gap-2");
export const AlertButton = createComponent("button", styles.primaryButton);
