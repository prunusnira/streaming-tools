import { useContext } from "react";
import { Message } from "../../../data/message";
import { TalkContext } from "../../../lib/context/talkProvider";
import { TeamContext } from "../../../lib/context/teamProvider";
import {
    TalkButton,
    TalkItemContainer,
    TalkItemMsg,
    TalkItemTime,
    TalkWrapper,
} from "./talkItem.style";

type Props = {
    team: number;
    msg: Message;
};

const TalkItem = ({ team, msg }: Props) => {
    const { team1, team2, updateTeam1, updateTeam2 } = useContext(TeamContext);
    const { closeTalkDialog } = useContext(TalkContext);

    const addToPickList = () => {
        if (team === 1) {
            team1.pickList.push(msg);
            team1.curPick++;
            updateTeam1(team1);
        }
        if (team === 2) {
            team2.pickList.push(msg);
            team2.curPick++;
            updateTeam2(team2);
        }
        closeTalkDialog();
    };

    return (
        <TalkItemContainer>
            <TalkWrapper>
                <TalkItemMsg>{msg.msg}</TalkItemMsg>
                <TalkItemTime>{msg.timeInTxt}</TalkItemTime>
            </TalkWrapper>
            <TalkButton onClick={addToPickList}>선택하기</TalkButton>
        </TalkItemContainer>
    );
};

export default TalkItem;
