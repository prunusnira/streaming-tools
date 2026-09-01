import { useContext, useState } from "react";
import { cn } from "@streaming-tools/ui";
import styles from "../pref/legacy.module.css";
import { TabType } from "../../data/tabType";
import { StreamerContext } from "../../lib/context/streamerProvider";
import BanpickList from "../bplist/banpickList";
import TeamList from "../teamlist/teamList";

const TabLayout = () => {
    const [tabType, setTabType] = useState(TabType.TeamList);
    const { data } = useContext(StreamerContext);
    const { userid } = data;

    const baseUrl: string = "https://www.twitch.tv/embed/";
    const baseUrl2: string = "/chat?parent=banpick.nira.one&darkpopout";

    return (
        <section className={styles.tabLayout}>
            <nav className={styles.tabPlacement}>
                <button
                    className={cn(styles.tabButton, tabType === TabType.TeamList && styles.tabActive)}
                    onClick={() => setTabType(TabType.TeamList)}
                >
                    유저목록
                </button>
                <button
                    className={cn(styles.tabButton, tabType === TabType.BPList && styles.tabActive)}
                    onClick={() => setTabType(TabType.BPList)}
                >
                    밴픽목록
                </button>
            </nav>
            <section className={styles.tabFragment}>
                {tabType === TabType.TeamList && <TeamList />}
                {tabType === TabType.BPList && <BanpickList />}
            </section>
            <section className={styles.tabChat}>
                <iframe title="Twitch 채팅" frameBorder="0" src={`${baseUrl}${userid}${baseUrl2}`} />
            </section>
        </section>
    );
};

export default TabLayout;
