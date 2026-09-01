import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const BodyContainer = createComponent("section", styles.stack);
export const BodyContent = createComponent("div", styles.howtoContent);
export const BodyPager = createComponent("div", styles.pager);
export const FooterCloseBtn = createComponent("button", styles.primaryButton);
export const HowtoPH1 = createComponent("div", "py-2 text-xl font-semibold");
export const HowtoPH2 = createComponent("div", "text-lg font-medium");
