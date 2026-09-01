import { useContext } from "react";
import { ModalType } from "../../data/modal";
import { ModalContext } from "../../lib/context/modalProvider";
import { StreamerContext } from "../../lib/context/streamerProvider";
import AlertDialog from "../dialog/alert/alertDlg";
import HowtoDlgBody from "../dialog/howto/howtoDlgBody";
import HowtoDlgFooter from "../dialog/howto/howtoDlgFotoer";
import HowtoDlgHeader from "../dialog/howto/howtoDlgHeader";
import { HeaderButton, HeaderContainer, HeaderIcon, HeaderItem } from "./header.style";

const Header = () => {
    const { data: dataStreamer, resetStreamer } = useContext(StreamerContext);
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
                    color={"black"}
                    bgColor={"yellow"}
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
                <HeaderButton
                    color={"white"}
                    bgColor={"red"}
                    onClick={() => {
                        openDialog({
                            width: 420,
                            maxWidth: 420,
                            active: true,
                            header: "데이터 리셋",
                            body: (
                                <AlertDialog
                                    type={ModalType.TwoBtn}
                                    btnOk={"리셋"}
                                    btn={"취소"}
                                    ok={() => {
                                        resetStreamer();
                                        window.location.reload();
                                    }}
                                    closeDialog={closeDialog}
                                    msg={
                                        "트위치 로그인 정보를 리셋하시겠습니까? (정보가 리셋되더라도 이 브라우저에 트위치에 로그인 되어있는 상태에서는 다시 자동적으로 로그인 될 수 있으니 트위치 홈페이지에서 로그아웃을 해주세요)"
                                    }
                                />
                            ),
                            footer: undefined,
                        });
                    }}
                >
                    데이터 리셋
                </HeaderButton>
            </HeaderItem>
        </HeaderContainer>
    );
};

export default Header;
