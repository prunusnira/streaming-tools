import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const ItemContainer = createComponent("div", styles.item);
export const ItemTitle = createComponent("div", styles.itemTitle);
export const ItemTitlePick = createComponent("div", "");
export const ItemTitleName = createComponent("div", "");
export const ItemBody = createComponent("div", styles.row);
export const ItemBodyContent = createComponent("div", styles.itemContent);
export const ItemFooter = createComponent("div", "text-sm text-slate-400");
export const ItemBodyBtnWrapper = createComponent("div", styles.itemButtons);
export const ItemButton = createComponent("button", styles.button);
