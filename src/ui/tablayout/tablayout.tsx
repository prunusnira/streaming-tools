import { useContext, useState } from "react";
import { TabType } from "../../data/tabType";
import { StreamerContext } from "../../lib/context/streamerProvider";
import BanpickList from "../bplist/banpickList";
import TeamList from "../teamlist/teamList";
import { TabButton } from "./tabitem.style";
import { TabChat, TabFragment, TabLayoutContainer, TabPlacement } from "./tablayout.style";

const TabLayout = () => {
    const [tabType, setTabType] = useState(TabType.TeamList);
    const { data } = useContext(StreamerContext);
    const { userid } = data;

    const baseUrl: string = "https://www.twitch.tv/embed/";
    const baseUrl2: string = "/chat?parent=banpick.nira.one&darkpopout";

    return (
        <TabLayoutContainer>
            <TabPlacement>
                <TabButton
                    active={tabType === TabType.TeamList}
                    onClick={() => setTabType(TabType.TeamList)}
                >
                    유저목록
                </TabButton>
                <TabButton
                    active={tabType === TabType.BPList}
                    onClick={() => setTabType(TabType.BPList)}
                >
                    밴픽목록
                </TabButton>
            </TabPlacement>
            <TabFragment>
                {tabType === TabType.TeamList && <TeamList />}
                {tabType === TabType.BPList && <BanpickList />}
            </TabFragment>
            <TabChat>
                <iframe frameBorder="0" src={`${baseUrl}${userid}${baseUrl2}`} />
            </TabChat>
        </TabLayoutContainer>
    );
};

export default TabLayout;
