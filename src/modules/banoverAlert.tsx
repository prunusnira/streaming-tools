import React from "react";
import { BPButton } from "../commonStyle/global.style";
import Popup from "../component/popup";

interface Props {
    teamName: string;
    teamNum: number;
    alertOpen: boolean;
    close: () => void;
}

const BanOverAlert = ({ teamName, teamNum, alertOpen, close }: Props) => {
    return (
        <Popup
            width={"90%"}
            maxWidth={360}
            active={alertOpen}
            header={"밴 횟수 초과"}
            body={
                <>
                    이번 턴에서 {teamName} (팀 {teamNum})에 대해 수행할 수 있는 밴 횟수를
                    초과했습니다
                </>
            }
            footer={<BPButton onClick={close}>닫기</BPButton>}
        />
    );
};

export default BanOverAlert;
