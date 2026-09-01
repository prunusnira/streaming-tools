import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const TeamListContainer = createComponent("section", styles.listContainer);
export const TeamListDesc = createComponent("section", styles.listDesc);
export const TeamListWrapper = createComponent("section", styles.listWrapper);
export const EmptyContainer = createComponent("div", styles.empty);
