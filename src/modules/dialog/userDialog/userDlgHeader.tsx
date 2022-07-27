import React from "react";
import User from "../../../data/user";
import {
    TitleWrapper,
    Title,
    TitleIcon,
    TitleUserName,
    TitleUserId,
    TitleSub,
    TitleDesc,
} from "./userDlg.style";

type Props = {
    picked: User;
    isNego: boolean;
};

const UserDlgHeader = ({ picked, isNego }: Props) => {
    return (
        <TitleWrapper>
            <Title>
                <TitleIcon src={picked.profileUrl} />
                <TitleUserName>{picked.name}</TitleUserName>
                <TitleUserId>{`(${picked.id})`}</TitleUserId>
                <TitleSub>{picked.subs && "[구독자]"}</TitleSub>
            </Title>
            <TitleDesc>
                {isNego
                    ? "ⓘ 스트리머와 내용에 대해 협상하세요. 여기서는 !픽 / !pick 을 사용할 수 없습니다"
                    : "ⓘ 당첨자는 '!픽 내용' 혹은 '!pick 내용'을 입력하여 픽을 진행할 수 있습니다"}
            </TitleDesc>
        </TitleWrapper>
    );
};

export default UserDlgHeader;
