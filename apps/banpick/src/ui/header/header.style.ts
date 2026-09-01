import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const HeaderContainer = createComponent("section", styles.headerContainer);
export const HeaderItem = createComponent("div", styles.headerItem);
export const HeaderIcon = createComponent("img", styles.headerIcon);
export const HeaderButton = createComponent("button", styles.primaryButton);
