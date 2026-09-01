import useController from "../core/control/useController";
import useIRC from "../core/irc/useIRC";
import Config from "./config/config";
import PopupModal from "./dialog/popupModal";
import TalkModal from "./dialog/talkModal";
import Footer from "./footer/footer";
import Header from "./header/header";
import styles from "./pref/legacy.module.css";
import TabLayout from "./tablayout/tablayout";

const MainPage = () => {
    useIRC();
    useController();

    return (
        <main className={styles.mainContainer}>
            <Header />
            <Config />
            <TabLayout />
            <Footer />
            <PopupModal />
            <TalkModal />
        </main>
    );
};

export default MainPage;
