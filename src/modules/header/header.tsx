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
                    <UserIcon alt="profimg" src={streamer.getProfileUrl()} />
                    <UserName>{streamer.getUserName()}</UserName>
                    <UserId>({streamer.getUserId()})</UserId>
                </HeaderUser>
                <HeaderButton>
                    <BPButton color="warning" className="reset-btn no-wrap" onClick={showHowTo}>
                        사용방법
                    </BPButton>
                    <BPButton color="danger" className="reset-btn no-wrap" onClick={tokenReset}>
                        로그인 상태 리셋
                    </BPButton>
                </HeaderButton>
            </HeaderWrapper>

            <HowToPopup howtoOpen={howtoOpen} showHowTo={showHowTo} />
        </>
    );
};

export default Header;
