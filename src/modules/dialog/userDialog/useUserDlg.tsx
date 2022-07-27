import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { MiniButton, BPButton } from "../../../commonStyle/global.style";
import { ModalContext } from "../../../context/modalContext";
import Message, { msToTime } from "../../../data/message";
import { Phase } from "../../../data/phase";
import Team from "../../../data/team";
import User, { emptyUser } from "../../../data/user";
import { IBanpickData } from "../../main/useBanpickData";
import {
    TitleWrapper,
    Title,
    TitleIcon,
    TitleUserName,
    TitleUserId,
    TitleSub,
    TitleDesc,
    ChatWrapper,
    ChatBox,
    ChatBoxLeft,
    ChatTimeWrapper,
    ChatTime,
    ChatMsg,
    ChatBtn,
    DlgFooter,
} from "./userDlg.style";
import UserDlgBody from "./userDlgBody";
import UserDlgFooter from "./userDlgFooter";
import UserDlgHeader from "./userDlgHeader";

type Props = {
    team1: Team;
    team2: Team;
    team1list: Array<string>;
    team2list: Array<string>;
    userList: Array<User>;
    banpickData: IBanpickData;
    setTeamInfo: (tn: number, t: Team) => void;
    updateUser: (user: User) => void;
};

const useUserDlg = ({
    team1,
    team2,
    team1list,
    team2list,
    userList,
    banpickData,
    setTeamInfo,
    updateUser,
}: Props) => {
    const [dlgUser, setDlgUser] = useState(false);
    const [picked, setPicked] = useState<User>(emptyUser);
    const [isNego, setNego] = useState(false);
    const [chatList, setChatList] = useState<Array<Message>>([]);
    // const picked = useRef<User>(emptyUser);
    // const isNego = useRef<boolean>(false);
    // const chatList = useRef<Array<Message>>([]);
    const { openDialog, closeDialog } = useContext(ModalContext);

    // useEffect(() => {
    //     console.log(picked.name);
    // }, [picked]);
    // useEffect(() => {
    //     console.log(chatList);
    // }, [chatList]);
    // useEffect(() => {
    //     console.log(isNego);
    // }, [isNego]);

    // const openUserDlg = () => {
    //     // console.log(chatList.length);
    //     openDialog({
    //         width: "90%",
    //         maxWidth: 1000,
    //         active: true,
    //         header: <UserDlgHeader picked={picked.current} isNego={isNego.current} />,
    //         body: (
    //             <UserDlgBody
    //                 chatList={chatList.current}
    //                 isNego={isNego.current}
    //                 pickMessage={pickMessage}
    //             />
    //         ),
    //         footer: (
    //             <UserDlgFooter
    //                 isNego={isNego.current}
    //                 skipMessage={skipMessage}
    //                 closeDialog={closeDialog}
    //             />
    //         ),
    //     });
    // };

    const pickMessage = (idx: number) => {
        if (picked) {
            // 어디 포함되었는지 확인 한 후 해당 팀 picklist에 추가
            const msg = chatList[idx];
            const team = checkTeam(msg.id);
            if (team === 1) {
                team1.cpick++;

                if (team1.cpick + team2.cpick >= banpickData.turnPick * 2) {
                    banpickData.setPhase(Phase.BAN);
                    setTeamInfo(1, {
                        ...team1,
                        pickList: [...team1.pickList, msg],
                        cpick: 0,
                    });
                    setTeamInfo(2, { ...team2, cpick: 0 });
                } else {
                    setTeamInfo(1, { ...team1, pickList: [...team1.pickList, msg] });
                }
            } else if (team === 2) {
                team2.cpick++;

                if (team1.cpick + team2.cpick >= banpickData.turnPick * 2) {
                    banpickData.setPhase(Phase.BAN);
                    setTeamInfo(1, { ...team1, cpick: 0 });
                    setTeamInfo(2, {
                        ...team2,
                        pickList: [...team2.pickList, msg],
                        cpick: 0,
                    });
                } else {
                    setTeamInfo(2, { ...team2, pickList: [...team2.pickList, msg] });
                }
            }
            const user = userList.filter((x) => x.id === msg.id)[0];
            user.picked = true;
            updateUser(user);
            setPicked(emptyUser);
            // closeDialog();
        }
    };

    const skipMessage = () => {
        if (picked) {
            const user = userList.filter((x) => x.id === picked.id)[0];
            user.picked = true;
            updateUser(user);
            setPicked(emptyUser);
            // closeDialog();
        }
    };

    const checkTeam = (id: string) => {
        return team1list.filter((x) => x === id).length > 0
            ? 1
            : team2list.filter((x) => x === id).length > 0
            ? 2
            : 0;
    };

    return {
        dlgUser,
        setDlgUser,
        picked,
        setPicked,
        isNego,
        setNego,
        chatList,
        setChatList,
        // openUserDlg,
        pickMessage,
        skipMessage,
    };
};

export default useUserDlg;
