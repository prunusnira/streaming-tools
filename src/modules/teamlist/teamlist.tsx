import React from "react";
import { Button, Col, Row } from "reactstrap";
import User from "../../data/user";
import { TeamListBody, TeamListHeader, TeamListWrapper } from "./teamlist.style";

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
                    <Row>
                        <Col xs="12">
                            {teamName} (
                            {(function () {
                                if (teamListDisplay) {
                                    return "-";
                                } else {
                                    return teamList.length;
                                }
                            })()}{" "}
                            명)
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Button
                                style={{ width: "100%" }}
                                size="sm"
                                color="dark"
                                onClick={() => setDlgTeamName(true)}
                            >
                                팀명 변경
                            </Button>
                            <Button
                                style={{ width: "100%" }}
                                size="sm"
                                color="success"
                                onClick={() => runRoulette()}
                            >
                                이 팀에서 1명 선택
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="rTargetTest"></Col>
                    </Row>
                </TeamListHeader>
                <TeamListBody>
                    {teamListDisplay ? (
                        <Row>
                            <Col xs="12">팀 목록 숨김 상태</Col>
                        </Row>
                    ) : (
                        teamList.map((v) => {
                            return (
                                <Row>
                                    <Col xs="12">
                                        <a
                                            href="#none"
                                            className="btn-members"
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
                                            <Button
                                                style={{ display: "none" }}
                                                id={"sum" + v.getUserId()}
                                                size="sm"
                                                color="dark"
                                                onClick={() => summonUser(v)}
                                            >
                                                강제소환
                                            </Button>
                                        </a>
                                    </Col>
                                </Row>
                            );
                        })
                    )}
                </TeamListBody>
            </TeamListWrapper>
        </>
    );
};

export default TeamList;
