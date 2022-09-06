import { useContext } from "react";
import useRoulette from "../../core/roulette/useRoulette";
import { Phase } from "../../data/status";
import { TeamInfoType } from "../../data/team";
import { ModalContext } from "../../lib/context/modalProvider";
import { StatusContext } from "../../lib/context/statusProvider";
import { TeamContext } from "../../lib/context/teamProvider";
import TNChangeBody from "../dialog/teamname/tnChangeBody";
import TNChangeFooter from "../dialog/teamname/tnChangeFooter";
import TNChangeHeader from "../dialog/teamname/tnChangeHeader";
import {
    ColumnBtnDiv,
    ColumnBtnName,
    ColumnBtnPick,
    ColumnContent,
    ColumnCounter,
    ColumnTitle,
    ColumnTitleWrapper,
    ListColumnContainer,
} from "./listColumn.style";

type Props = {
    teamInfo: TeamInfoType;
    children: React.ReactNode;
};

const ListColumn = ({ teamInfo, children }: Props) => {
    const { openDialog, closeDialog } = useContext(ModalContext);
    const { userList } = useContext(TeamContext);
    const { data } = useContext(StatusContext);
    const { runRoulette } = useRoulette();
    return (
        <ListColumnContainer>
            <ColumnTitleWrapper>
                <ColumnTitle>
                    {teamInfo.name} (
                    {data.teamVisible
                        ? userList.filter((x) => x.team === teamInfo.num).length
                        : "-"}{" "}
                    명)
                </ColumnTitle>
                <ColumnCounter>
                    {data.phase === Phase.Pick && `픽 ${teamInfo.curPick} / ${data.pickPhase}`}
                    {data.phase === Phase.Ban && `밴 ${teamInfo.curBan} / ${data.banPhase}`}
                </ColumnCounter>
            </ColumnTitleWrapper>
            <ColumnBtnDiv>
                <ColumnBtnPick
                    onClick={() => {
                        runRoulette(teamInfo.num);
                    }}
                >
                    이 팀에서 선택
                </ColumnBtnPick>
                <ColumnBtnName
                    onClick={() => {
                        openDialog({
                            width: 420,
                            maxWidth: 420,
                            active: true,
                            header: <TNChangeHeader />,
                            body: <TNChangeBody teamNum={teamInfo.num} />,
                            footer: <TNChangeFooter closeDialog={closeDialog} />,
                        });
                    }}
                >
                    팀명 변경
                </ColumnBtnName>
            </ColumnBtnDiv>
            <ColumnContent>{children}</ColumnContent>
        </ListColumnContainer>
    );
};

export default ListColumn;
