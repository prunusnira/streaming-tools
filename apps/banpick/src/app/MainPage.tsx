import { useController } from "@banpick/features/banpick/logic/control/useController";
import { useIRC } from "@banpick/features/chat/logic/irc/useIRC";
import { Config } from "@banpick/features/banpick/components/config/Config";
import { TalkModal } from "@banpick/features/chat/components/TalkModal";
import { Footer } from "@banpick/app/components/footer/Footer";
import { Header } from "@banpick/app/components/header/Header";
import styles from "./MainPage.module.css";
import { TabLayout } from "@banpick/app/components/tablayout/TabLayout";

export const MainPage = () => {
    useIRC();
    useController();

    return (
        <main className={styles.mainContainer}>
            <Header />
            <Config />
            <TabLayout />
            <Footer />
            <TalkModal />
        </main>
    );
};
