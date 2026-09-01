import styles from "../pref/legacy.module.css";
import { createComponent } from "../pref/createComponent";

export const ConfigContainer = createComponent("section", styles.configContainer);
export const ConfigBtnGroup = createComponent("div", styles.configGroup);
export const ConfigCtrl = createComponent("div", styles.configCtrl);
export const ConfigPhaseWrapper = createComponent("div", styles.stack);
export const ConfigPhase = createComponent("div", styles.configPhase);
export const PhaseChangeBtn = createComponent("button", styles.button);
export const ConfSButton = createComponent("button", styles.primaryButton);
export const ConfButton = createComponent("button", styles.button);
