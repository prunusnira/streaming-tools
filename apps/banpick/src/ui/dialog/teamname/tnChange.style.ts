import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const TNChangeContainer = createComponent("section", styles.stack);
export const TNCurrent = createComponent("div", "pb-3");
export const TNNew = createComponent("input", styles.input);
export const TNBtnWrapper = createComponent("div", "flex justify-center gap-2 pt-3");
export const TNButton = createComponent("button", styles.primaryButton);
