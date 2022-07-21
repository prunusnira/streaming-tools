import React from "react";
import { Green, White } from "../../commonStyle/color";
import { BPButton, MiniButton } from "../../commonStyle/global.style";
import { Phase } from "../../data/phase";
import Team from "../../data/team";
import User from "../../data/user";
import { IBanpickData } from "../main/useBanpickData";
import {
    TeamListBody,
    TeamListHeader,
    TeamListHeaderSub,
    TeamListWrapper,
    TLAnchor,
    TLEmpty,
    TLRow,
} from "./teamlist.style";

type TeamListProps = {
    userList: Array<User>;
    team: Team;
    teamList: Array<string>;
    banpickData: IBanpickData;

    setDlgTN: (b: boolean) => void;
    runRoulette: (tn: number) => void;
    isPicked: (id: string) => boolean;
    updateUser: (u: User) => void;
    summonUser: (id: string) => void;
};

const TeamList = ({
    userList,
    team,
    teamList,
    banpickData,

    setDlgTN,
    runRoulette,
    isPicked,
    updateUser,
    summonUser,
}: TeamListProps) => {
    return (
        <TeamListWrapper>
            <TeamListHeader className="text-center">
                <TLRow fontBig={true}>
                    {team.teamName} (
                    {(function () {
                        if (banpickData.showUsers) {
                            return "-";
                        } else {
                            return teamList.length;
                        }
                    })()}{" "}
                    명)
                </TLRow>
                <TLRow>
                    {banpickData.phase === Phase.PICK &&
                        `이번 페이즈 Pick ${team.cpick} / ${banpickData.turnPick}`}
                    {banpickData.phase === Phase.BAN &&
                        `이번 페이즈 Ban ${team.cban} / ${banpickData.turnBan}`}
                </TLRow>
            </TeamListHeader>
            <TeamListHeaderSub>
                <TLRow>
                    <BPButton
                        color={White}
                        bgColor={Green}
                        borderRadius={0}
                        onClick={() => {
                            runRoulette(team.teamNum);
                        }}
                    >
                        이 팀에서 1명 선택
                    </BPButton>
                    <BPButton onClick={() => setDlgTN(true)}>팀명 변경</BPButton>
                </TLRow>
            </TeamListHeaderSub>
            <TeamListBody>
                {banpickData.showUsers ? (
                    <TLRow>팀 목록 숨김 상태</TLRow>
                ) : teamList.length === 0 ? (
                    <TLEmpty>아직 등록된 사람이 없음</TLEmpty>
                ) : (
                    teamList.map((v) => {
                        return (
                            <TLRow key={`team_${team.teamNum}_${v}`} align={"left"}>
                                <TLAnchor
                                    href="#none"
                                    onMouseOver={(ev) => {
                                        document.getElementById("sum" + v)!.style.display = "block";
                                    }}
                                    onMouseOut={(ev) => {
                                        document.getElementById("sum" + v)!.style.display = "none";
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
                                    {/* <MiniButton
                                        style={{ display: "none", width: "auto" }}
                                        id={"sum" + v}
                                        onClick={() => summonUser(v)}
                                    >
                                        강제소환
                                    </MiniButton> */}
                                </TLAnchor>
                            </TLRow>
                        );
                    })
                )}
            </TeamListBody>
        </TeamListWrapper>
    );
};

export default TeamList;
