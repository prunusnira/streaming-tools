import styles from "../../pref/legacy.module.css";
import { createComponent } from "../../pref/createComponent";

export const EditDlgContainer = createComponent("section", styles.stack);
export const EditExistChunk = createComponent("div", "flex flex-col gap-1 pb-5");
export const ExistTitle = createComponent("span", "text-sm text-slate-400");
export const ExistTxt = createComponent("span", "");
export const EditInput = createComponent("input", styles.input);
export const EditBtnWrapper = createComponent("div", "flex w-full justify-center gap-2");
export const EditButton = createComponent("button", styles.primaryButton);
