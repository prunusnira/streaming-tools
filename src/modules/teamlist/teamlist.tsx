import React from "react";
import { BPButton } from "../../commonStyle/global.style";
import User from "../../data/user";
import { TeamListBody, TeamListHeader, TeamListWrapper, TLRow } from "./teamlist.style";

type TeamListProps = {
    teamName: string;
    teamList: Array<User>;
    teamListDisplay: boolean;
    summonUser: (user: User) => void;
    setDlgTeamName: (b: boolean) => void;
    runRoulette: () => void;
    changeUserStatePicked: (user: User) => void;
};

const TeamList = ({
    teamName,
    teamList,
    teamListDisplay,
    summonUser,
    setDlgTeamName,
    runRoulette,
    changeUserStatePicked,
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
                        <BPButton onClick={() => setDlgTeamName(true)}>팀명 변경</BPButton>
                        <BPButton onClick={() => runRoulette()}>이 팀에서 1명 선택</BPButton>
                    </TLRow>
                    <TLRow id="rTargetTest"></TLRow>
                </TeamListHeader>
                <TeamListBody>
                    {teamListDisplay ? (
                        <TLRow>팀 목록 숨김 상태</TLRow>
                    ) : (
                        teamList.map((v) => {
                            return (
                                <TLRow>
                                    <a
                                        href="#none"
                                        onMouseOver={(ev) => {
                                            document.getElementById(
                                                "sum" + v.getUserId()
                                            )!.style.display = "block";
                                        }}
                                        onMouseOut={(ev) => {
                                            document.getElementById(
                                                "sum" + v.getUserId()
                                            )!.style.display = "none";
                                        }}
                                    >
                                        <span onClick={() => changeUserStatePicked(v)}>
                                            {(function () {
                                                if (v.isPicked()) {
                                                    return <del>{v.getUserName()}</del>;
                                                } else {
                                                    return v.getUserName();
                                                }
                                            })()}
                                        </span>
                                        <BPButton
                                            style={{ display: "none" }}
                                            id={"sum" + v.getUserId()}
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
