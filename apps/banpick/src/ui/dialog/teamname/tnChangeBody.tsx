import { useContext, useState } from "react";
import { ModalContext } from "../../../lib/context/modalProvider";
import { TeamContext } from "../../../lib/context/teamProvider";
import { TNBtnWrapper, TNButton, TNChangeContainer, TNCurrent, TNNew } from "./tnChange.style";

type Props = {
    teamNum: number;
};

const TNChangeBody = ({ teamNum }: Props) => {
    const [teamName, setTeamName] = useState("");
    const { team1, team2, updateTeam1, updateTeam2 } = useContext(TeamContext);
    const { closeDialog } = useContext(ModalContext);

    return (
        <TNChangeContainer>
            <TNCurrent>
                현재 팀 {teamNum}의 이름:&nbsp;
                {teamNum === 1 && team1.name}
                {teamNum === 2 && team2.name}
            </TNCurrent>
            <TNNew
                value={teamName}
                autoFocus={true}
                onChange={(e) => {
                    setTeamName(e.target.value);
                }}
            />
            <TNBtnWrapper>
                <TNButton onClick={closeDialog}>취소</TNButton>
                <TNButton
                    onClick={() => {
                        if (teamNum === 1) {
                            team1.name = teamName;
                            updateTeam1(team1);
                        } else if (teamNum === 2) {
                            team2.name = teamName;
                            updateTeam2(team2);
                        }
                        setTeamName("");
                        closeDialog();
                    }}
                >
                    확인
                </TNButton>
            </TNBtnWrapper>
        </TNChangeContainer>
    );
};

export default TNChangeBody;
