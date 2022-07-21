import { useState } from "react";
import Message from "../../data/message";
import Roulette from "../../data/roulette";
import Team from "../../data/team";
import User from "../../data/user";
import { IAlertDialog } from "../dialog/alertDialog/useAlertDialog";
import { IBanpickData } from "../main/useBanpickData";

type Params<T> = {
    userList: Array<User>;
    team1: Team;
    team2: Team;
    team1list: Array<string>;
    team2list: Array<string>;
    banpickData: IBanpickData;
    setPicked: (u: User) => void;
    setDlgUser: (b: boolean) => void;
    setNego: (b: boolean) => void;
    setChatList: (c: Array<Message>) => void;
    setAlertDisplay: (b: boolean) => void;
    setupAlertDialog: ({ title, body, btnOK }: IAlertDialog) => void;
};

const useRoulette = ({
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
}: Params<User>) => {
    // 룰렛
    const [dlgRoulette, setDlgRoulette] = useState(false);

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
            setupAlertDialog({
                title: "ⓘ 사용자 룰렛 알림",
                body: "이번 페이즈에 사용 가능한 픽 횟수를 초과했습니다",
                btnOK: "확인",
            });
            setAlertDisplay(true);
        } else if (list.length > 0) {
            // 다이얼로그 열기
            setDlgRoulette(true);

            // 현재 목록에서 유저 선택
            let randVal = Math.floor(Math.random() * list.length);
            if (randVal == list.length) randVal--;

            // 룰렛 선택 표기
            const roulette = new Roulette(list, false);

            roulette.setupPos(randVal);
            roulette.start();
            roulette.roulette(updateRoulette);
            roulette.stop((obj: Object) => {
                updateRoulette(list[randVal]);
                setChatList([list[randVal].lastChat]);
                setTimeout(closeRoulette, 1000);
            }, 3);
        } else {
            // alert 표기
            setupAlertDialog({
                title: "ⓘ 사용자 룰렛 알림",
                body: "이 팀에 이용 가능한 인원이 없습니다",
                btnOK: "확인",
            });
            setAlertDisplay(true);
        }
    };

    const updateRoulette = (obj: Object) => {
        const user = userList.filter((x) => x.id === (obj as User).id)[0];
        setPicked(user);
    };

    const closeRoulette = () => {
        setDlgRoulette(false);
        setDlgUser(true);
        setNego(false);
    };

    return {
        dlgRoulette,
        setDlgRoulette,
        runRoulette,
    };
};

export default useRoulette;
