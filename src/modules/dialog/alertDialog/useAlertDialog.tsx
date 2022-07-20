import { useState } from "react";

export interface IAlertDialog {
    title: string;
    body: string;
    btnOK: string;
}

const useAlertDialog = () => {
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [alertTitle, setTitle] = useState("");
    const [alertBody, setBody] = useState("");
    const [alertBtn, setBtn] = useState("");

    const setupAlertDialog = ({ title, body, btnOK }: IAlertDialog) => {
        setTitle(title);
        setBody(body);
        setBtn(btnOK);
    };

    return {
        alertDisplay,
        alertTitle,
        alertBody,
        alertBtn,
        setAlertDisplay,
        setupAlertDialog,
    };
};

export default useAlertDialog;
