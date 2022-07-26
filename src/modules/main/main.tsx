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
import { useEffect } from "react";
import useMain from "./useMain";
import InnerPresenter from "../presenter/innerPresenter";
import TeamListContainer from "../teamlist/teamlistContainer";
import BanPickContainer from "../banpick/banpickContainer";
import ChatPresenter from "../chat/chatPresenter";
import useBanpickData from "./useBanpickData";
import useStorage from "../../db/useStorage";
import UserDialog from "../dialog/userDialog/userdlg";
import useUserDlg from "../dialog/userDialog/useUserDlg";
import useRoulette from "../roulette/useRoulette";
import { emptyUser } from "../../data/user";
import PopupModal from "../../component/popupModal";

const MainPage = () => {
    const { banpickData } = useBanpickData();

    const { pageMode, setPageMode } = useMain();

    const {
        userList,
        team1,
        team2,
        team1list,
        team2list,
        addUser,
        removeUser,
        hasUser,
        getUser,
        updateUser,
        getTeamInfo,
        setTeamInfo,
    } = useStorage();

    const {
        dlgUser,
        setDlgUser,
        picked,
        setPicked,
        isNego,
        setNego,
        chatList,
        setChatList,
        pickMessage,
        skipMessage,
        openUserDlg,
    } = useUserDlg({
        team1,
        team2,
        team1list,
        team2list,
        userList,
        banpickData,
        setTeamInfo,
        updateUser,
    });

    const { runRoulette } = useRoulette({
        userList,
        team1,
        team2,
        team1list,
        team2list,
        banpickData,
        picked,
        setPicked,
        setDlgUser,
        setNego,
        setChatList,
        openUserDlg,
    });

    const { registerObserver } = useIRC({
        banpickData,
        isNego,
        hasUser,
        removeUser,
        addUser,
        getUser,
        updateUser,
        getTeamInfo,
        setTeamInfo,

        picked,
        chatList,
        setChatList,
        setPicked,
    });

    const observer = useRef<Observer>(new Observer());
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
                            유저
                            <br />
                            목록
                        </TabButton>
                        <TabButton
                            activate={pageMode === PageMode.BanPickList}
                            onClick={() => setPageMode(PageMode.BanPickList)}
                        >
                            밴픽
                            <br />
                            목록
                        </TabButton>
                    </TabLayout>
                    <DataWrapper>
                        <InnerPresenter
                            Component={
                                pageMode === PageMode.UserList ? (
                                    <TeamListContainer
                                        key="team1"
                                        userList={userList}
                                        team={team1}
                                        teamList={team1list}
                                        banpickData={banpickData}
                                        setTeamInfo={setTeamInfo}
                                        runRoulette={runRoulette}
                                        updateUser={updateUser}
                                    />
                                ) : (
                                    <BanPickContainer
                                        key="bp1"
                                        userList={userList}
                                        team={team1}
                                        teamList={team1list}
                                        banpickData={banpickData}
                                        setTeamInfo={setTeamInfo}
                                        setDlgUser={setDlgUser}
                                        setPicked={setPicked}
                                        setChatList={setChatList}
                                        setNego={setNego}
                                        runRoulette={runRoulette}
                                    />
                                )
                            }
                        />
                        <InnerPresenter
                            Component={
                                pageMode === PageMode.UserList ? (
                                    <TeamListContainer
                                        key="team2"
                                        userList={userList}
                                        team={team2}
                                        teamList={team2list}
                                        banpickData={banpickData}
                                        setTeamInfo={setTeamInfo}
                                        runRoulette={runRoulette}
                                        updateUser={updateUser}
                                    />
                                ) : (
                                    <BanPickContainer
                                        key="bp2"
                                        userList={userList}
                                        team={team2}
                                        teamList={team2list}
                                        banpickData={banpickData}
                                        setTeamInfo={setTeamInfo}
                                        setDlgUser={setDlgUser}
                                        setPicked={setPicked}
                                        setChatList={setChatList}
                                        setNego={setNego}
                                        runRoulette={runRoulette}
                                    />
                                )
                            }
                        />
                    </DataWrapper>
                    <ChatPresenter username={user.loginName} />
                </MainLayout>
                <Footer />
            </MainContainer>

            <PopupModal />
            {/* <UserDialog
                key={"userdialog"}
                nego={isNego}
                user={picked}
                chat={chatList}
                display={dlgUser}
                use={pickMessage}
                skip={skipMessage}
                close={() => {
                    setDlgUser(false);
                    setPicked(emptyUser);
                }}
            /> */}
        </>
    );
};

export default MainPage;
