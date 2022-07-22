import React, { useState } from "react";
import { BPButton } from "../../commonStyle/global.style";
import {
    HeaderButton,
    HeaderTitle,
    HeaderUser,
    HeaderWrapper,
    UserIcon,
    UserId,
    UserName,
} from "./header.style";
import HowToPopup from "./howto/howto";
import useHeader from "./useHeader";

const Header = () => {
    const [howtoOpen, setHowToOpen] = useState(false);

    const showHowTo = () => {
        setHowToOpen(!howtoOpen);
    };

    const { streamer, tokenReset } = useHeader();

    return (
        <>
            <HeaderWrapper>
                <HeaderTitle>Twitch BanPicker</HeaderTitle>
                <HeaderUser>
                    <UserIcon alt="profimg" src={streamer.profileUrl} />
                    <UserName>{streamer.name}</UserName>
                    <UserId>({streamer.id})</UserId>
                </HeaderUser>
                <HeaderButton>
                    <BPButton onClick={showHowTo}>사용방법</BPButton>
                    <BPButton onClick={tokenReset}>로그인 상태 리셋</BPButton>
                </HeaderButton>
            </HeaderWrapper>

            <HowToPopup howtoOpen={howtoOpen} showHowTo={showHowTo} />
        </>
    );
};

export default Header;
