import React from "react";
import { BPButton } from "../../../commonStyle/global.style";
import Popup from "../../../component/popup";
import HowToBody from "./howtoBody";

type Props = {
    howtoOpen: boolean;
    showHowTo: () => void;
};

const HowToPopup = ({ howtoOpen, showHowTo }: Props) => (
    <Popup
        width={"90%"}
        maxWidth={1024}
        active={howtoOpen}
        header={"사용 방법"}
        body={<HowToBody />}
        footer={<BPButton onClick={showHowTo}>닫기</BPButton>}
    />
);

export default HowToPopup;
