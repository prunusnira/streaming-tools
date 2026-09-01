import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const FooterContainer = createComponent("section", styles.footer);
export const FooterItem = createComponent("span", "");
export const FooterAnchor = createComponent("a", styles.footerLink);
