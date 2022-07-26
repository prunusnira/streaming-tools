import React, { useContext, useRef } from "react";
import User from "../../data/user";
import Team from "../../data/team";
import { ModalContext } from "../../context/modalContext";
import { BPButton } from "../../commonStyle/global.style";
import TeamNameChange from "./teamNameChange";

type TeamList = {
    team: Team;
    userList: Array<User>;
    setTeamInfo: (teamNum: number, team: Team) => Promise<void>;
};

const useTeamList = ({ team, userList, setTeamInfo }: TeamList) => {
    const newName = useRef<string>("");
    const { openDialog, closeDialog } = useContext(ModalContext);

    const openTeamNameChangeDialog = () => {
        openDialog({
            width: "90%",
            maxWidth: 480,
            active: true,
            header: "팀 이름 변경",
            body: (
                <TeamNameChange
                    teamName={team.teamName}
                    updateNewName={(n: string) => (newName.current = n)}
                />
            ),
            footer: (
                <>
                    <BPButton onClick={() => changeTeamName(newName.current)}>변경</BPButton>
                    <BPButton onClick={() => closeTeamNameChangeDialog()}>취소</BPButton>
                </>
            ),
        });
    };

    const closeTeamNameChangeDialog = () => {
        closeDialog();
    };

    const changeTeamName = (newName: string) => {
        team.teamName = newName;
        setTeamInfo(team.teamNum, team);
        closeDialog();
    };

    const isPicked = (id: string) => {
        const user = userList.filter((x) => x.id === id)[0];
        return user ? user.picked : false;
    };

    return {
        isPicked,
        openTeamNameChangeDialog,
    };
};

export default useTeamList;
