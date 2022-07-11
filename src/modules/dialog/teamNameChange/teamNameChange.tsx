import React, { useState } from "react";
import { BPButton } from "../../../commonStyle/global.style";
import Popup from "../../../component/popup";
import { TNCurrent, TNInput, TNWrapper } from "./teamNameChange.style";

interface Props {
    display: boolean;
    teamName: string;
    changeTeamName: (name: string) => void;
    close: () => void;
}

const TeamNameChangeDlg = ({ display, teamName, changeTeamName, close }: Props) => {
    const [newName, setNewName] = useState("");
    return (
        <Popup
            width={"90%"}
            maxWidth={480}
            active={display}
            header={"팀 이름 변경"}
            body={
                <TNWrapper>
                    <TNCurrent>현재 팀 이름: {teamName}</TNCurrent>
                    <TNInput
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </TNWrapper>
            }
            footer={
                <>
                    <BPButton onClick={() => changeTeamName(newName)}>변경</BPButton>
                    <BPButton onClick={() => close()}>취소</BPButton>
                </>
            }
        />
    );
};

export default TeamNameChangeDlg;
