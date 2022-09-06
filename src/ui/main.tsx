import useIRC from "../core/irc/useIRC";
import Config from "./config/config";
import PopupModal from "./dialog/popupModal";
import TalkModal from "./dialog/talkModal";
import Footer from "./footer/footer";
import Header from "./header/header";
import { MainContainer } from "./main.style";
import TabLayout from "./tablayout/tablayout";

const MainPage = () => {
    useIRC();

    return (
        <MainContainer>
            <Header />
            <Config />
            <TabLayout />
            <Footer />
            <PopupModal />
            <TalkModal />
        </MainContainer>
    );
};

export default MainPage;
