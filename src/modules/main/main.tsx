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
import useBanpickData from "./useBanpickData";
import useStorage from "../../db/useStorage";

const MainPage = () => {
    const { banpickData } = useBanpickData();

    const {
        pageMode,
        setPageMode,
        hideTeamList,
        setHideTeamList,
        selectedUser,
        setSelectedUser,
        selectedChatLog,
        setChatLog,
    } = useMain();

    const {
        team1,
        team2,
        team1list,
        team2list,
        addUser,
        getUser,
        getUserById,
        removeUser,
        hasUser,
        hasUserById,
        getTeamList,
        getTeamInfo,
        setTeamInfo,
    } = useStorage();

    const { registerObserver, changeSelectedUser } = useIRC({
        banpickData,
        hasUser,
        hasUserById,
        getUserById,
        removeUser,
        addUser,
        getTeamInfo,

        selectedUser,
        setSelectedUser,
        selectedChatLog,
        setChatLog,
    });

    const observer = useRef<Observer>(new Observer());
    const { speech } = useTTS();

    const { user } = useSelector((state: RootState) => state);

    useEffect(() => {
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
                                        teamList={team1list}
                                        teamListDisplay={hideTeamList}
                                        setTeamInfo={setTeamInfo}
                                        selectedUser={selectedUser}
                                        setSelectedUser={setSelectedUser}
                                    />
                                ) : (
                                    <></>
                                    // <BanPickContainer team={team1} getMember={getMember} />
                                )
                            }
                        />
                        <InnerPresenter
                            Component={
                                pageMode === PageMode.UserList ? (
                                    <TeamListContainer
                                        key="team2"
                                        team={team2}
                                        teamList={team2list}
                                        teamListDisplay={hideTeamList}
                                        setTeamInfo={setTeamInfo}
                                        selectedUser={selectedUser}
                                        setSelectedUser={setSelectedUser}
                                    />
                                ) : (
                                    <></>
                                    // <BanPickContainer team={team2} getMember={getMember} />
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
