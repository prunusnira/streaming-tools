import React from "react";
import { BPButton, MiniButton } from "../../../commonStyle/global.style";
import Popup from "../../../component/popup";
import Message from "../../../data/message";
import User from "../../../data/user";
import {
    Title,
    TitleIcon,
    TitleUserName,
    TitleUserId,
    TitleSub,
    TitleDesc,
    TitleWrapper,
    ChatBox,
    ChatMsg,
    ChatTime,
    ChatWrapper,
    ChatBtn,
    DlgFooter,
    ChatBoxLeft,
    ChatTimeWrapper,
} from "./userDlg.style";

interface Props {
    nego: boolean;
    user: User;
    chat: Array<Message>;
    display: boolean;
    use: (msg: Message) => void;
    skip: (user: User) => void;
    close: () => void;
}

const UserDialog = ({ user, nego, chat, display, use, skip, close }: Props) => {
    return (
        <Popup
            width={"90%"}
            maxWidth={1000}
            active={display}
            header={
                <TitleWrapper>
                    <Title>
                        <TitleIcon src={user.profileUrl} />
                        <TitleUserName>{user.name}</TitleUserName>
                        <TitleUserId>{`(${user.id})`}</TitleUserId>
                        <TitleSub>{user.subs && "[구독자]"}</TitleSub>
                    </Title>
                    <TitleDesc>
                        {nego
                            ? "ⓘ 스트리머와 내용에 대해 협상하세요. 여기서는 !픽 / !pick 을 사용할 수 없습니다"
                            : "ⓘ 당첨자는 '!픽 내용' 혹은 '!pick 내용'을 입력하여 픽을 진행할 수 있습니다"}
                    </TitleDesc>
                </TitleWrapper>
            }
            body={
                <ChatWrapper>
                    {chat.map((v, i) => {
                        return (
                            <ChatBox key={`chat_${v.id}_${i}`}>
                                <ChatBoxLeft>
                                    <ChatTimeWrapper>
                                        <ChatTime>from {v.timeInTxt}</ChatTime>
                                        <ChatTime>now {Date.now() - v.time}</ChatTime>
                                    </ChatTimeWrapper>
                                    <ChatMsg>{v.msg}</ChatMsg>
                                </ChatBoxLeft>
                                {!nego && (
                                    <ChatBtn>
                                        <MiniButton onClick={() => use(v)}>
                                            이걸로 결정하기
                                        </MiniButton>
                                    </ChatBtn>
                                )}
                            </ChatBox>
                        );
                    })}
                </ChatWrapper>
            }
            footer={
                <DlgFooter>
                    <BPButton onClick={() => skip(user)}>넘기기</BPButton>
                    <BPButton onClick={() => close()}>닫기</BPButton>
                </DlgFooter>
            }
        />
    );
};

export default UserDialog;
