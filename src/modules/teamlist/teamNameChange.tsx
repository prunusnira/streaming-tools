import React, { useState } from "react";
import { TNWrapper, TNCurrent, TNInput } from "./teamNameChange.style";

type Props = {
    teamName: string;
    updateNewName: (n: string) => void;
};

const TeamNameChange = ({ teamName, updateNewName }: Props) => {
    const [newName, setNewName] = useState("");

    return (
        <TNWrapper>
            <TNCurrent>현재 팀 이름: {teamName}</TNCurrent>
            <TNInput
                type="text"
                value={newName}
                onChange={(e) => {
                    setNewName(e.target.value);
                    updateNewName(e.target.value);
                }}
                autoFocus={true}
            />
        </TNWrapper>
    );
};

export default TeamNameChange;
