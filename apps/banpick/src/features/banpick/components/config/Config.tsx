import { useContext } from "react";
import { Phase } from "@banpick/features/banpick/model/status";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { StatusContext } from "@banpick/features/banpick/model/StatusProvider";
import { TeamContext } from "@banpick/features/banpick/model/TeamProvider";
import { AlertDialog, Button, ModalType } from "@streaming-tools/ui";
import styles from "./Config.module.css";
import { Control } from "./Control";

export const Config = () => {
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
                <Button
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
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => {
                        openDialog({
                            width: 420,
                            maxWidth: 420,
                            active: true,
                            header: "진행사항 리셋",
                            body: (
                                <AlertDialog
                                    type={ModalType.TwoBtn}
                                    confirmLabel={"리셋"}
                                    cancelLabel={"취소"}
                                    onConfirm={() => {
                                        resetStatus();
                                        resetTeam();
                                        closeDialog();
                                    }}
                                    onCancel={closeDialog}
                                    message={"현재 진행중인 밴픽을 리셋하시겠습니까?"}
                                />
                            ),
                            footer: undefined,
                        });
                    }}
                >
                    리셋
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => {
                        data.teamVisible ? changeTeamVisible(false) : changeTeamVisible(true);
                    }}
                >
                    {data.teamVisible && "팀원 목록 가리기"}
                    {!data.teamVisible && "팀원 목록 보이기"}
                </Button>
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
                <Button
                    className={styles.button}
                    disabled={data.phase === Phase.Ready ? true : false}
                    onClick={forcePhaseChange}
                >
                    강제 페이즈 전환
                </Button>
            </div>
        </section>
    );
};
