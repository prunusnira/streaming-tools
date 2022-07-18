import React, { useEffect } from "react";
import Popup from "../../component/popup";
import User from "../../data/user";
import { RBody, RFooter } from "./rouletteDialog.style";
import useRoulette from "./useRoulette";

type Props = {
    display: boolean;
    pickedUser: User | null;
    onClose: () => void;
};

const RouletteDialog = ({ display, pickedUser, onClose }: Props) => {
    useEffect(() => {
        if (!display) {
            onClose();
        }
    }, [display]);

    return pickedUser ? (
        <Popup
            width={"90%"}
            maxWidth={480}
            active={display}
            header={"사용자 룰렛"}
            body={<RBody>{pickedUser.name}</RBody>}
            footer={<RFooter></RFooter>}
        />
    ) : (
        <></>
    );
};

export default RouletteDialog;
