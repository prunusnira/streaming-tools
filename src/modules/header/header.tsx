import React, { useContext } from "react";
import { BPButton } from "../../commonStyle/global.style";
import { ModalContext } from "../../context/modalContext";
import {
    HeaderButton,
    HeaderTitle,
    HeaderUser,
    HeaderWrapper,
    UserIcon,
    UserId,
    UserName,
} from "./header.style";
import HowToBody from "./howto/howtoBody";
import useHeader from "./useHeader";

const Header = () => {
    const { openDialog, closeDialog } = useContext(ModalContext);

    const showHowTo = () => {
        openDialog({
            width: "90%",
            maxWidth: 1024,
            active: true,
            header: "사용 방법",
            body: <HowToBody />,
            footer: <BPButton onClick={closeDialog}>닫기</BPButton>,
        });
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
        </>
    );
};

export default Header;
