import { useContext } from "react";
import { ModalContext } from "../../lib/context/modalProvider";
import { StreamerContext } from "../../lib/context/streamerProvider";
import HowtoDlgBody from "../dialog/howto/howtoDlgBody";
import HowtoDlgFooter from "../dialog/howto/howtoDlgFotoer";
import HowtoDlgHeader from "../dialog/howto/howtoDlgHeader";
import { HeaderButton, HeaderContainer, HeaderIcon, HeaderItem } from "./header.style";

const Header = () => {
    const { data: dataStreamer } = useContext(StreamerContext);
    const { openDialog, closeDialog } = useContext(ModalContext);

    return (
        <HeaderContainer>
            <HeaderItem fontSize={24} position={"left"}>
                Twitch BanPicker
            </HeaderItem>
            <HeaderItem>
                <HeaderIcon src={dataStreamer.iconurl} />
                {dataStreamer.displayname} ({dataStreamer.userid})
            </HeaderItem>
            <HeaderItem position={"right"}>
                <HeaderButton
                    onClick={() => {
                        openDialog({
                            width: "90%",
                            maxWidth: 1024,
                            header: <HowtoDlgHeader />,
                            body: <HowtoDlgBody />,
                            footer: <HowtoDlgFooter closeDialog={closeDialog} />,
                            active: true,
                        });
                    }}
                >
                    사용방법
                </HeaderButton>
            </HeaderItem>
        </HeaderContainer>
    );
};

export default Header;
