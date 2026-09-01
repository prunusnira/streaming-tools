import { type ChangeEvent, useContext, useState } from "react";
import { ModalContext } from "../../../lib/context/modalProvider";
import { TeamContext } from "../../../lib/context/teamProvider";
import styles from "../../pref/legacy.module.css";

type Props = {
    teamNum: number;
};

const TNChangeBody = ({ teamNum }: Props) => {
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
                <button className={styles.primaryButton} onClick={closeDialog}>취소</button>
                <button className={styles.primaryButton}
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
                </button>
            </div>
        </section>
    );
};

export default TNChangeBody;
