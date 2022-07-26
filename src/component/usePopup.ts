import { useContext } from "react";
import { ModalContext } from "../context/modalContext";

const usePopup = () => {
    const { data, openDialog, closeDialog } = useContext(ModalContext);
};

export default usePopup;
