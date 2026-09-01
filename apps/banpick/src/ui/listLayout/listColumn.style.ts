import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const ListColumnContainer = createComponent("section", styles.listColumn);
export const ColumnTitleWrapper = createComponent("div", styles.columnTitle);
export const ColumnTitle = createComponent("div", styles.columnName);
export const ColumnCounter = createComponent("div", "text-sm text-slate-400");
export const ColumnBtnDiv = createComponent("div", styles.columnButtons);
export const ColumnBtnPick = createComponent("button", styles.primaryButton);
export const ColumnBtnName = createComponent("button", styles.button);
export const ColumnContent = createComponent("div", styles.columnContent);
