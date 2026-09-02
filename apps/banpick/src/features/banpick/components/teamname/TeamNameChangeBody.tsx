import { type ChangeEvent, useContext, useState } from "react";
import { Button } from "@streaming-tools/ui";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { TeamContext } from "@banpick/features/banpick/model/TeamProvider";
import styles from "./TeamNameChangeBody.module.css";

type Props = {
    teamNum: number;
};

export const TeamNameChangeBody = ({ teamNum }: Props) => {
    const [teamName, setTeamName] = useState("");
    const { team1, team2, updateTeam1, updateTeam2 } = useContext(TeamContext);
    const { closeDialog } = useContext(ModalContext);

    return (
        <section className={styles.stack}>
            <div className="pb-3">
                현재 팀 {teamNum}의 이름:&nbsp;
                {teamNum === 1 && team1.name}
                {teamNum === 2 && team2.name}
            </div>
            <input className={styles.input}
                value={teamName}
                autoFocus={true}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setTeamName(event.target.value);
                }}
            />
            <div className="flex justify-center gap-2 pt-3">
                <Button className={styles.primaryButton} onClick={closeDialog}>취소</Button>
                <Button className={styles.primaryButton}
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
                </Button>
            </div>
        </section>
    );
};
