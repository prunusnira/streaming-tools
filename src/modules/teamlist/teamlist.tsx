import React from "react";
import { BPButton } from "../../commonStyle/global.style";
import User from "../../data/user";
import { TeamListBody, TeamListHeader, TeamListWrapper, TLRow } from "./teamlist.style";

type TeamListProps = {
    teamName: string;
    teamList: Array<User>;
    teamListDisplay: boolean;
    summonUser: (user: User) => void;

    setDlgTN: (b: boolean) => void;
    runRoulette: () => void;
};

const TeamList = ({
    teamName,
    teamList,
    teamListDisplay,
    summonUser,

    setDlgTN,
    runRoulette,
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
                                runRoulette();
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
                                <TLRow key={`team_${v.id}`}>
                                    <a
                                        href="#none"
                                        onMouseOver={(ev) => {
                                            document.getElementById("sum" + v.id)!.style.display =
                                                "block";
                                        }}
                                        onMouseOut={(ev) => {
                                            document.getElementById("sum" + v.id)!.style.display =
                                                "none";
                                        }}
                                    >
                                        <span
                                            onClick={() => {
                                                // changeUserStatePicked(v);
                                                v.picked = !v.picked;
                                            }}
                                        >
                                            {(function () {
                                                if (v.picked) {
                                                    return <del>{v.name}</del>;
                                                } else {
                                                    return v.name;
                                                }
                                            })()}
                                        </span>
                                        <BPButton
                                            style={{ display: "none" }}
                                            id={"sum" + v.id}
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
