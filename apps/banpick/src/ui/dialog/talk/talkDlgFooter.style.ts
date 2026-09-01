import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const TalkFooterContainer = createComponent("div", "flex gap-2");
export const TalkFooterBtn = createComponent("button", styles.primaryButton);
