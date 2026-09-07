import { useState } from "react";
import { Button, cn } from "@streaming-tools/ui";
import styles from "./TabLayout.module.css";
import { TabType } from "./TabType";
import { BanpickList } from "@banpick/features/banpick/components/bplist/BanpickList";
import { TeamList } from "@banpick/features/banpick/components/teamlist/TeamList";
import { LiveChatPanel } from "@banpick/features/chat/components/LiveChatPanel";

export const TabLayout = () => {
    const [tabType, setTabType] = useState(TabType.TeamList);
    return (
        <section className={styles.tabLayout}>
            <nav className={styles.tabPlacement}>
                <Button
                    className={cn(
                        styles.tabButton,
                        tabType === TabType.TeamList && styles.tabActive,
                    )}
                    onClick={() => setTabType(TabType.TeamList)}
                >
                    유저목록
                </Button>
                <Button
                    className={cn(styles.tabButton, tabType === TabType.BPList && styles.tabActive)}
                    onClick={() => setTabType(TabType.BPList)}
                >
                    밴픽목록
                </Button>
            </nav>
            <section className={styles.tabFragment}>
                {tabType === TabType.TeamList && <TeamList />}
                {tabType === TabType.BPList && <BanpickList />}
            </section>
            <section className={styles.tabChat}>
                <LiveChatPanel />
            </section>
        </section>
    );
};
