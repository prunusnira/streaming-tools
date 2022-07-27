import React from "react";
import { MiniButton } from "../../../commonStyle/global.style";
import Message, { msToTime } from "../../../data/message";
import {
    ChatWrapper,
    ChatBox,
    ChatBoxLeft,
    ChatTimeWrapper,
    ChatTime,
    ChatMsg,
    ChatBtn,
} from "./userDlg.style";

type Props = {
    chatList: Array<Message>;
    isNego: boolean;
    pickMessage: (idx: number) => void;
};

const UserDlgBody = ({ chatList, isNego, pickMessage }: Props) => {
    return (
        <ChatWrapper>
            {chatList.map((v, i) => {
                return (
                    <ChatBox key={`chat_${v.id}_${i}`}>
                        <ChatBoxLeft>
                            <ChatTimeWrapper>
                                <ChatTime>{v.timeInTxt}</ChatTime>
                                <ChatTime>{`${msToTime(Date.now() - v.time)} 초 전`}</ChatTime>
                            </ChatTimeWrapper>
                            <ChatMsg>{v.msg}</ChatMsg>
                        </ChatBoxLeft>
                        {!isNego && (
                            <ChatBtn>
                                <MiniButton onClick={() => pickMessage(i)}>
                                    이걸로 결정하기
                                </MiniButton>
                            </ChatBtn>
                        )}
                    </ChatBox>
                );
            })}
        </ChatWrapper>
    );
};

export default UserDlgBody;
