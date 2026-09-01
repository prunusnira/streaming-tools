import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const TalkHeaderContainer = createComponent("section", "flex justify-between gap-4");
export const TalkDlgTitle = createComponent("div", "flex items-center gap-3");
export const TitleIcon = createComponent("img", styles.titleIcon);
export const TitleName = createComponent("div", "font-medium");
export const TitleId = createComponent("div", "text-sm text-slate-400");
export const TitleTime = createComponent("div", "text-sm text-slate-400");
