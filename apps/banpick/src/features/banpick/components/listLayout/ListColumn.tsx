import { useContext } from "react";
import { useRoulette } from "@banpick/features/banpick/logic/roulette/useRoulette";
import { Phase } from "@banpick/features/banpick/model/status";
import { TeamInfoType } from "@banpick/features/banpick/model/team";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { StatusContext } from "@banpick/features/banpick/model/StatusProvider";
import { TeamContext } from "@banpick/features/banpick/model/TeamProvider";
import { AlertDialog, Button, ModalType } from "@streaming-tools/ui";
import { TeamNameChangeBody } from "@banpick/features/banpick/components/teamname/TeamNameChangeBody";
import { TeamNameChangeHeader } from "@banpick/features/banpick/components/teamname/TeamNameChangeHeader";
import styles from "./ListColumn.module.css";

type Props = {
    teamInfo: TeamInfoType;
    children: React.ReactNode;
};

export const ListColumn = ({ teamInfo, children }: Props) => {
    const { openDialog, closeDialog } = useContext(ModalContext);
    const { userList } = useContext(TeamContext);
    const { data } = useContext(StatusContext);
    const { runRoulette } = useRoulette();
    return (
        <section className={styles.listColumn}>
            <div className={styles.columnTitle}>
                <div className={styles.columnName}>
                    {teamInfo.name} (
                    {data.teamVisible
                        ? userList.filter((x) => x.team === teamInfo.num).length
                        : "-"}{" "}
                    명)
                </div>
                <div className="text-sm text-slate-400">
                    {data.phase === Phase.Pick && `픽 ${teamInfo.curPick} / ${data.pickPhase}`}
                    {data.phase === Phase.Ban && `밴 ${teamInfo.curBan} / ${data.banPhase}`}
                </div>
            </div>
            <div className={styles.columnButtons}>
                <Button className={styles.primaryButton}
                    onClick={() => {
                        if (data.phase === Phase.Pick && teamInfo.curPick < data.pickPhase) {
                            runRoulette(teamInfo.num);
                        } else {
                            openDialog({
                                width: 420,
                                maxWidth: 420,
                                active: true,
                                header: "제한 안내",
                                body: (
                                    <AlertDialog
                                        cancelLabel={"확인"}
                                        message={`${teamInfo.num}번 팀에 대해 이번 페이즈에 할당된 픽 수를 모두 사용했습니다`}
                                        onCancel={closeDialog}
                                    />
                                ),
                                footer: undefined,
                            });
                        }
                    }}
                >
                    이 팀에서 선택
                </Button>
                <Button className={styles.button}
                    onClick={() => {
                        openDialog({
                            width: 420,
                            maxWidth: 420,
                            active: true,
                            header: <TeamNameChangeHeader />,
                            body: <TeamNameChangeBody teamNum={teamInfo.num} />,
                            footer: undefined,
                        });
                    }}
                >
                    팀명 변경
                </Button>
            </div>
            <div className={styles.columnContent}>{children}</div>
        </section>
    );
};
