import { Message } from "../../../data/message";
import { UserType } from "../../../data/user";
import { TalkDlgContainer, TalkDlgDesc, TalkDlgMsgList } from "./talkDlg.style";
import TalkItem from "./talkItem";

type Props = {
    team: number;
    msglist: Array<Message>;
    negoMode: boolean;
};

const TalkDlg = ({ team, msglist, negoMode }: Props) => {
    return (
        <TalkDlgContainer>
            <TalkDlgDesc>
                {negoMode
                    ? "ⓘ 스트리머와 내용에 대해 협상하세요. 여기서는 !픽 / !pick 을 사용할 수 없습니다"
                    : "ⓘ 당첨자는 '!픽 내용' 혹은 '!pick 내용'을 입력하여 픽을 진행할 수 있습니다"}
            </TalkDlgDesc>
            <TalkDlgMsgList>
                {msglist.map((x, i) => (
                    <TalkItem key={`talk${i}`} team={team} msg={x} />
                ))}
            </TalkDlgMsgList>
        </TalkDlgContainer>
    );
};

export default TalkDlg;
