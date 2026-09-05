import { useController } from "@banpick/features/banpick/logic/control/useController";
import { useChatConnections } from "@banpick/features/chat/logic/useChatConnections";
import { Config } from "@banpick/features/banpick/components/config/Config";
import { TalkModal } from "@banpick/features/chat/components/TalkModal";
import { Header } from "@banpick/app/components/header/Header";
import styles from "./MainPage.module.css";
import { TabLayout } from "@banpick/app/components/tablayout/TabLayout";

export const MainPage = () => {
    useChatConnections();
    useController();

    return (
        <main className={styles.mainContainer}>
            <Header />
            <Config />
            <TabLayout />
            <TalkModal />
        </main>
    );
};
