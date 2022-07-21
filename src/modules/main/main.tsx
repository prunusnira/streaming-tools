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
import RouletteDialog from "../roulette/rouletteDialog";
import useRoulette from "../roulette/useRoulette";
import AlertDialog from "../dialog/alertDialog/alertDialog";
import useAlertDialog from "../dialog/alertDialog/useAlertDialog";

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

    const { alertDisplay, alertTitle, alertBody, alertBtn, setAlertDisplay, setupAlertDialog } =
        useAlertDialog();

    const {
        dlgUser,
        setDlgUser,
        picked,
        setPicked,
        isNego,
        setNego,
        chatList,
        setChatList,
        useMessage,
        skipMessage,
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

    const { dlgRoulette, setDlgRoulette, runRoulette } = useRoulette({
        userList,
        team1,
        team2,
        team1list,
        team2list,
        banpickData,
        setPicked,
        setDlgUser,
        setNego,
        setChatList,
        setAlertDisplay,
        setupAlertDialog,
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
        setDlgUser,
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
                                        userList={userList}
                                        team={team1}
                                        teamList={team1list}
                                        banpickData={banpickData}
                                        setTeamInfo={setTeamInfo}
                                        setDlgUser={setDlgUser}
                                        setPicked={setPicked}
                                        setChatList={setChatList}
                                        setNego={setNego}
                                        setAlertDisplay={setAlertDisplay}
                                        setupAlertDialog={setupAlertDialog}
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
                                        userList={userList}
                                        team={team2}
                                        teamList={team2list}
                                        banpickData={banpickData}
                                        setTeamInfo={setTeamInfo}
                                        setDlgUser={setDlgUser}
                                        setPicked={setPicked}
                                        setChatList={setChatList}
                                        setNego={setNego}
                                        setAlertDisplay={setAlertDisplay}
                                        setupAlertDialog={setupAlertDialog}
                                    />
                                )
                            }
                        />
                    </DataWrapper>
                    <ChatPresenter username={user.loginName} />
                </MainLayout>
                <Footer />
            </MainContainer>

            <UserDialog
                key={"userdialog"}
                nego={isNego}
                user={picked}
                chat={chatList}
                display={dlgUser}
                use={useMessage}
                skip={skipMessage}
                close={() => setDlgUser(false)}
            />
            <RouletteDialog
                key={"roulette"}
                display={dlgRoulette}
                pickedUser={picked}
                onClose={() => setDlgRoulette(false)}
            />
            <AlertDialog
                display={alertDisplay}
                title={alertTitle}
                body={alertBody}
                btnOK={alertBtn}
                setAlertDisplay={setAlertDisplay}
            />
        </>
    );
};

export default MainPage;
