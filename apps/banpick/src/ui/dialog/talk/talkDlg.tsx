import { useEffect, useRef } from "react";
import { Message } from "../../../data/message";
import { UserType } from "../../../data/user";
import { TalkDlgContainer, TalkDlgDesc, TalkDlgMsgList } from "./talkDlg.style";
import TalkItem from "./talkItem";

type Props = {
    pickedUser: UserType;
    msglist: Array<Message>;
    negoMode: boolean;
};

const TalkDlg = ({ pickedUser, msglist, negoMode }: Props) => {
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // msglist가 갱신되면 내부 스크롤을 맨 아래로 내림
        listRef.current?.scrollTo(0, listRef.current?.scrollHeight);
    }, [msglist]);

    return (
        <TalkDlgContainer>
            <TalkDlgDesc>
                {negoMode
                    ? "ⓘ 스트리머와 내용에 대해 협상하세요. 여기서는 !픽 / !pick 을 사용할 수 없습니다"
                    : "ⓘ 당첨자는 '!픽 내용' 혹은 '!pick 내용'을 입력하여 픽을 진행할 수 있습니다"}
            </TalkDlgDesc>
            <TalkDlgMsgList ref={listRef}>
                {msglist.map((x, i) => (
                    <TalkItem key={`talk${i}`} pickedUser={pickedUser} msg={x} />
                ))}
            </TalkDlgMsgList>
        </TalkDlgContainer>
    );
};

export default TalkDlg;
