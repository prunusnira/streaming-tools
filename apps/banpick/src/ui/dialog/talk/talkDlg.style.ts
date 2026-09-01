import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const TalkDlgContainer = createComponent("section", styles.talk);
export const TalkDlgDesc = createComponent("div", "text-sm text-slate-400");
export const TalkDlgMsgList = createComponent("div", styles.talkList);
