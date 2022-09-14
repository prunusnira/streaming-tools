import { useContext, useEffect } from "react";
import { TeamContext } from "../../lib/context/teamProvider";
import ListColumn from "../listLayout/listColumn";
import { TeamListContainer, TeamListDesc, TeamListWrapper } from "./teamList.style";
import TeamItem from "./teamItem";
import { UserType } from "../../data/user";
import TeamListEmpty from "./teamListEmpty";
import { StatusContext } from "../../lib/context/statusProvider";
import TeamListInvisible from "./teamListInvisible";

const TeamList = () => {
    const { team1, team2, userList, updateUserList } = useContext(TeamContext);
    const { data } = useContext(StatusContext);

    const checkLength = (arr: Array<UserType>) => {
        return arr.length > 0;
    };

    const changePickedState = (id: string) => {
        const idx = userList.findIndex((x) => x.userid === id);
        if (idx > -1) {
            userList[idx].picked = !userList[idx].picked;
            updateUserList(userList);
        }
    };

    return (
        <TeamListContainer>
            <TeamListDesc>
                * 시청자 이름 위에 마우스 커서를 올리고 마우스 오른쪽 단추를 누르면 해당 사용자를
                바로 소환할 수 있습니다
            </TeamListDesc>
            <TeamListWrapper>
                <ListColumn teamInfo={team1}>
                    {!data.teamVisible ? (
                        <TeamListInvisible />
                    ) : checkLength(userList.filter((x) => x.team === 1)) ? (
                        userList
                            .filter((x) => x.team === 1)
                            .map((y, i) => (
                                <TeamItem
                                    key={`team1-${i}-${y.userid}`}
                                    picked={y}
                                    changePickedState={() => changePickedState(y.userid)}
                                >
                                    {y.displayname}
                                </TeamItem>
                            ))
                    ) : (
                        <TeamListEmpty />
                    )}
                </ListColumn>
                <ListColumn teamInfo={team2}>
                    {!data.teamVisible ? (
                        <TeamListInvisible />
                    ) : checkLength(userList.filter((x) => x.team === 2)) ? (
                        userList
                            .filter((x) => x.team === 2)
                            .map((y, i) => (
                                <TeamItem
                                    key={`team2-${i}-${y.userid}`}
                                    picked={y}
                                    changePickedState={() => changePickedState(y.userid)}
                                >
                                    {y.displayname}
                                </TeamItem>
                            ))
                    ) : (
                        <TeamListEmpty />
                    )}
                </ListColumn>
            </TeamListWrapper>
        </TeamListContainer>
    );
};

export default TeamList;
