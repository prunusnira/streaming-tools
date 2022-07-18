import React from "react";
import { BPButton } from "../../commonStyle/global.style";
import User from "../../data/user";
import { TeamListBody, TeamListHeader, TeamListWrapper, TLRow } from "./teamlist.style";

type TeamListProps = {
    userList: Array<User>;
    teamNum: number;
    teamName: string;
    teamList: Array<string>;
    teamListDisplay: boolean;

    setDlgTN: (b: boolean) => void;
    runRoulette: (tn: number) => void;
    isPicked: (id: string) => boolean;
    updateUser: (u: User) => void;
    summonUser: (id: string) => void;
};

const TeamList = ({
    userList,
    teamNum,
    teamName,
    teamList,
    teamListDisplay,

    setDlgTN,
    runRoulette,
    isPicked,
    updateUser,
    summonUser,
}: TeamListProps) => {
    return (
        <>
            <TeamListWrapper>
                <TeamListHeader className="text-center">
                    <TLRow>
                        {teamName} (
                        {(function () {
                            if (teamListDisplay) {
                                return "-";
                            } else {
                                return teamList.length;
                            }
                        })()}{" "}
                        명)
                    </TLRow>
                    <TLRow>
                        <BPButton onClick={() => setDlgTN(true)}>팀명 변경</BPButton>
                        <BPButton
                            onClick={() => {
                                runRoulette(teamNum);
                            }}
                        >
                            이 팀에서 1명 선택
                        </BPButton>
                    </TLRow>
                    <TLRow id="rTargetTest"></TLRow>
                </TeamListHeader>
                <TeamListBody>
                    {teamListDisplay ? (
                        <TLRow>팀 목록 숨김 상태</TLRow>
                    ) : (
                        teamList.map((v) => {
                            return (
                                <TLRow key={`team_${v}`}>
                                    <a
                                        href="#none"
                                        onMouseOver={(ev) => {
                                            document.getElementById("sum" + v)!.style.display =
                                                "block";
                                        }}
                                        onMouseOut={(ev) => {
                                            document.getElementById("sum" + v)!.style.display =
                                                "none";
                                        }}
                                    >
                                        <span
                                            onClick={() => {
                                                const user = userList.filter((x) => x.id === v)[0];
                                                user.picked = !user.picked;
                                                updateUser(user);
                                            }}
                                        >
                                            {(function () {
                                                if (isPicked(v)) {
                                                    return <del>{v}</del>;
                                                } else {
                                                    return v;
                                                }
                                            })()}
                                        </span>
                                        <BPButton
                                            style={{ display: "none" }}
                                            id={"sum" + v}
                                            onClick={() => summonUser(v)}
                                        >
                                            강제소환
                                        </BPButton>
                                    </a>
                                </TLRow>
                            );
                        })
                    )}
                </TeamListBody>
            </TeamListWrapper>
        </>
    );
};

export default TeamList;
