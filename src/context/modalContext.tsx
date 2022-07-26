import React, { useState } from "react";

type ModalData = {
    width: number | string;
    maxWidth: number;
    active: boolean;
    header: React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
};

type ModalType = {
    data: ModalData;
    openDialog: (data: ModalData) => void;
    modifyDlgBody: (body: React.ReactNode) => void;
    closeDialog: () => void;
};

const initModal: ModalData = {
    width: 0,
    maxWidth: 0,
    active: false,
    header: "",
    body: "",
    footer: "",
};

export const ModalContext = React.createContext<ModalType>({
    data: initModal,
    openDialog: (d: ModalData) => {},
    modifyDlgBody: (body: React.ReactNode) => {},
    closeDialog: () => {},
});

type Props = {
    children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
    const [width, setWidth] = useState<number | string>(0);
    const [maxWidth, setMaxWidth] = useState(0);
    const [active, setActive] = useState(false);
    const [header, setHeader] = useState<React.ReactNode>("");
    const [body, setBody] = useState<React.ReactNode>("");
    const [footer, setFooter] = useState<React.ReactNode>("");

    const openDialog = ({ width, maxWidth, header, body, footer }: ModalData) => {
        // setModalData({
        //     width,
        //     maxWidth,
        //     active: true,
        //     header,
        //     body,
        //     footer,
        // });
        setWidth(width);
        setMaxWidth(maxWidth);
        setActive(true);
        setHeader(header);
        setBody(body);
        setFooter(footer);
    };

    const closeDialog = () => {
        // setModalData({ ...modalData, active: false });
        setActive(false);
    };

    const modifyDlgBody = (body: React.ReactNode) => {
        // setModalData({ ...modalData, active: true, body });
        setBody(body);
    };

    return (
        <ModalContext.Provider
            value={{
                data: {
                    width,
                    maxWidth,
                    active,
                    header,
                    body,
                    footer,
                },
                openDialog,
                modifyDlgBody,
                closeDialog,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
