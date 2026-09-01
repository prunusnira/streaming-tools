import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const TalkItemContainer = createComponent("div", styles.talkItem);
export const TalkWrapper = createComponent("div", styles.stack);
export const TalkItemMsg = createComponent("div", "");
export const TalkItemTime = createComponent("div", "text-xs text-slate-500");
export const TalkButton = createComponent("button", styles.button);
