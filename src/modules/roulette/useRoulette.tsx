import React, { MutableRefObject, useContext } from "react";
import { BPButton } from "../../commonStyle/global.style";
import { ModalContext } from "../../context/modalContext";
import Message from "../../data/message";
import Roulette from "../../data/roulette";
import Team from "../../data/team";
import User from "../../data/user";
import { PopupBody, PopupFooter, PopupTitle } from "../dialog/alertDialog/alertDialog.style";
import { IBanpickData } from "../main/useBanpickData";
import { RBody, RFooter } from "./rouletteDialog.style";

type Params<T> = {
    userList: Array<User>;
    team1: Team;
    team2: Team;
    team1list: Array<string>;
    team2list: Array<string>;
    banpickData: IBanpickData;
    picked: User;
    // picked: MutableRefObject<User>;
    // chatList: MutableRefObject<Array<Message>>;
    // isNego: MutableRefObject<boolean>;
    setPicked: (u: User) => void;
    setDlgUser: (b: boolean) => void;
    setNego: (b: boolean) => void;
    setChatList: (c: Array<Message>) => void;
    // openUserDlg: () => void;
};

const useRoulette = ({
    userList,
    team1,
    team2,
    team1list,
    team2list,
    banpickData,
    picked,
    // chatList,
    // isNego,
    setPicked,
    setDlgUser,
    setNego,
    setChatList,
}: // openUserDlg,
Params<User>) => {
    // 룰렛
    const { openDialog, modifyDlgBody, closeDialog } = useContext(ModalContext);

    const runRoulette = (teamNum: number) => {
        const list = new Array<User>();
        // 이미 선택된 유저 제외
        teamNum === 1
            ? team1list.forEach((x) => {
                  const user = userList.filter((u) => u.id === x)[0];
                  if (!user.picked) {
                      list.push(user);
                  }
              })
            : team2list.forEach((x) => {
                  const user = userList.filter((u) => u.id === x)[0];
                  if (!user.picked) {
                      list.push(user);
                  }
              });

        const isOver =
            teamNum === 1
                ? team1.cpick >= banpickData.turnPick
                : team2.cpick >= banpickData.turnPick;

        // 사용자 수 검사
        if (isOver) {
            // alert 표기
            openDialog({
                width: "480px",
                maxWidth: 480,
                active: true,
                header: <PopupTitle>ⓘ 사용자 룰렛 알림</PopupTitle>,
                body: <PopupBody>이번 페이즈에 사용 가능한 픽 횟수를 초과했습니다</PopupBody>,
                footer: (
                    <PopupFooter>
                        <BPButton onClick={() => closeDialog()}>확인</BPButton>
                    </PopupFooter>
                ),
            });
        } else if (list.length > 0) {
            // 현재 목록에서 유저 선택
            let randVal = Math.floor(Math.random() * list.length);
            if (randVal == list.length) randVal--;

            // 다이얼로그 열기
            openDialog({
                width: "90%",
                maxWidth: 480,
                active: true,
                header: "ⓘ 사용자 룰렛",
                body: <RBody>{picked.name}</RBody>,
                footer: <RFooter></RFooter>,
            });

            // 룰렛 선택 표기
            const roulette = new Roulette(list, false);

            roulette.setupPos(randVal);
            roulette.start();
            roulette.roulette(updateRoulette);
            roulette.stop((obj: Object) => {
                const picked = list[randVal];
                updateRoulette(picked);
                updatePickedUser(picked);
                setChatList([list[randVal].lastChat]);
                // chatList.current = [list[randVal].lastChat];
                setTimeout(closeRoulette, 1000);
            }, 3);
        } else {
            // alert 표기
            openDialog({
                width: 480,
                maxWidth: 480,
                active: true,
                header: <PopupTitle>ⓘ 사용자 룰렛 알림</PopupTitle>,
                body: <PopupBody>이 팀에 이용 가능한 인원이 없습니다</PopupBody>,
                footer: (
                    <PopupFooter>
                        <BPButton onClick={() => closeDialog()}>확인</BPButton>
                    </PopupFooter>
                ),
            });
        }
    };

    const updateRoulette = (obj: Object) => {
        const user = userList.filter((x) => x.id === (obj as User).id)[0];
        modifyDlgBody(<RBody>{user.name}</RBody>);
    };

    const updatePickedUser = (obj: Object) => {
        const user = userList.filter((x) => x.id === (obj as User).id)[0];
        setPicked(user);
        // picked.current = user;
    };

    const closeRoulette = () => {
        closeDialog();
        setDlgUser(true);
        // openUserDlg();
        setNego(false);
        // isNego.current = false;
    };

    return {
        runRoulette,
    };
};

export default useRoulette;
