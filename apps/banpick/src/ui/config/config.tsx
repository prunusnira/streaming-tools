import { useContext, useEffect } from "react";
import { ModalType } from "../../data/modal";
import { Phase } from "../../data/status";
import { ModalContext } from "../../lib/context/modalProvider";
import { StatusContext } from "../../lib/context/statusProvider";
import { TeamContext } from "../../lib/context/teamProvider";
import AlertDialog from "../dialog/alert/alertDlg";
import styles from "../pref/legacy.module.css";
import Control from "./control";

const Config = () => {
    const {
        data,
        startup,
        resume,
        pause,
        resetStatus,
        changeTeamVisible,
        changePhase,
        totalPickAdd,
        totalPickSub,
        phaseBanAdd,
        phaseBanSub,
        phasePickAdd,
        phasePickSub,
    } = useContext(StatusContext);
    const { team1, team2, updateTeam1, updateTeam2, resetTeam } = useContext(TeamContext);
    const { openDialog, closeDialog } = useContext(ModalContext);

    const forcePhaseChange = () => {
        if (data.phase === Phase.Pick) {
            changePhase(Phase.Ban);
            team1.curPick = 0;
            team2.curPick = 0;
            updateTeam1(team1);
            updateTeam2(team2);
        }
        if (data.phase === Phase.Ban) {
            changePhase(Phase.Pick);
            team1.curBan = 0;
            team2.curBan = 0;
            updateTeam1(team1);
            updateTeam2(team2);
        }
    };

    return (
        <section className={styles.configContainer}>
            <div className={styles.configGroup}>
                <button
                    className={styles.primaryButton}
                    onClick={() => {
                        !data.run && startup();
                        data.run && !data.join && resume();
                        data.run && data.join && pause();
                    }}
                >
                    {!data.run && "인원 모집 시작"}
                    {data.run && !data.join && "인원 모집 재개"}
                    {data.run && data.join && "인원 모집 중단"}
                </button>
                <button className={styles.button}
                    onClick={() => {
                        openDialog({
                            width: 420,
                            maxWidth: 420,
                            active: true,
                            header: "진행사항 리셋",
                            body: (
                                <AlertDialog
                                    type={ModalType.TwoBtn}
                                    btnOk={"리셋"}
                                    btn={"취소"}
                                    ok={() => {
                                        resetStatus();
                                        resetTeam();
                                        closeDialog();
                                    }}
                                    closeDialog={closeDialog}
                                    msg={"현재 진행중인 밴픽을 리셋하시겠습니까?"}
                                />
                            ),
                            footer: undefined,
                        });
                    }}
                >
                    리셋
                </button>
                <button className={styles.button}
                    onClick={() => {
                        data.teamVisible ? changeTeamVisible(false) : changeTeamVisible(true);
                    }}
                >
                    {data.teamVisible && "팀원 목록 가리기"}
                    {!data.teamVisible && "팀원 목록 보이기"}
                </button>
            </div>
            <div className={styles.configCtrl}>
                <Control
                    type={0}
                    title={"픽(전체)"}
                    num={data.totalPick}
                    add={totalPickAdd}
                    sub={totalPickSub}
                />
                <Control
                    type={1}
                    title={"픽(페이즈)"}
                    num={data.pickPhase}
                    add={phasePickAdd}
                    sub={phasePickSub}
                />
                <Control
                    type={2}
                    title={"밴(페이즈)"}
                    num={data.banPhase}
                    add={phaseBanAdd}
                    sub={phaseBanSub}
                />
            </div>
            <div className={styles.stack}>
                <div className={styles.configPhase}>
                    {data.phase === Phase.Ready && "READY"}
                    {data.phase === Phase.Pick && "PICK PHASE"}
                    {data.phase === Phase.Ban && "BAN PHASE"}
                </div>
                <button className={styles.button}
                    disabled={data.phase === Phase.Ready ? true : false}
                    onClick={forcePhaseChange}
                >
                    강제 페이즈 전환
                </button>
            </div>
        </section>
    );
};

export default Config;
