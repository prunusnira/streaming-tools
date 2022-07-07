import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Observer } from "../../data/observer/observer";
import { PageMode } from "../../data/pageMode";
import { RootState } from "../../redux/reducer";
import Footer from "../footer/footer";
import Header from "../header/header";

import { DataWrapper, MainContainer, MainLayout, TabButton, TabLayout } from "./main.style";
import Config from "../config/config";
import useIRC from "../../websocket/useIRC";
import useTTS from "../../tts/useTTS";
import { useEffect } from "react";
import useMain from "./useMain";
import InnerPresenter from "../presenter/innerPresenter";
import TeamListContainer from "../teamlist/teamlistContainer";
import BanPickContainer from "../banpick/banpickContainer";
import ChatPresenter from "../chat/chatPresenter";
import PickSelect from "../pickSelect/pickSelect";
import BanOverAlert from "../banoverAlert";
import UserDialog from "../dialog/userDialog/userdlg";
import useBanpickData from "./useBanpickData";

const MainPage = () => {
    const { banpickData } = useBanpickData();

    const {
        pageMode,
        setPageMode,
        team1,
        team2,
        updateTeam,
        hideTeamList,
        setHideTeamList,
        selectedUser,
        setSelectedUser,
    } = useMain();

    const { registerObserver, changeSelectedUser } = useIRC({
        team1,
        team2,
        banpickData,
        updateTeam,
    });
    const observer = useRef<Observer>(new Observer());
    const { speech } = useTTS();

    const { user } = useSelector((state: RootState) => state);

    useEffect(() => {
        console.log("register observer");
        registerObserver(observer.current);
    }, []);

    return (
        <>
            <MainContainer>
                <Header />
                <Config banpickData={banpickData} />
                <MainLayout>
                    <TabLayout>
                        <TabButton
                            activate={pageMode === PageMode.UserList}
                            onClick={() => setPageMode(PageMode.UserList)}
                        >
                            User List
                        </TabButton>
                        <TabButton
                            activate={pageMode === PageMode.BanPickList}
                            onClick={() => setPageMode(PageMode.BanPickList)}
                        >
                            BanPick
                        </TabButton>
                    </TabLayout>
                    <DataWrapper>
                        <InnerPresenter
                            Component={
                                pageMode === PageMode.UserList ? (
                                    <TeamListContainer
                                        key="team1"
                                        team={team1}
                                        updateTeam={updateTeam}
                                        teamListDisplay={hideTeamList}
                                    />
                                ) : (
                                    <BanPickContainer team={team1} />
                                )
                            }
                        />
                        <InnerPresenter
                            Component={
                                pageMode === PageMode.UserList ? (
                                    <TeamListContainer
                                        key="team2"
                                        team={team2}
                                        updateTeam={updateTeam}
                                        teamListDisplay={hideTeamList}
                                    />
                                ) : (
                                    <BanPickContainer team={team2} />
                                )
                            }
                        />
                    </DataWrapper>
                    <ChatPresenter username={user.loginName} />
                </MainLayout>
                <Footer />
            </MainContainer>

            {/* <UserDialog
                key="userdialog"
                nego={currentNego}
                team={currentUserTeam.current}
                user={currentUser}
                chat={currentChat}
                display={userDlg}
                use={useMessage}
                skip={skipUserWindow}
                close={closeUserWindow}
            />
            <BanOverAlert
                teamName={banDlgTeamName}
                teamNum={banDlgTeamNum}
                alertOpen={banDlg}
                close={banOverAlertClose}
            />
            <PickSelect
                onRoulette={onPickedRoulette}
                pickedMsgDlg={pickedMsgDlg}
                pickedFailMsgDlg={pickedFailMsgDlg}
                pickedMsg={pickedMsg}
                close={closePickedMsgDlg}
            /> */}
        </>
    );
};

export default MainPage;
