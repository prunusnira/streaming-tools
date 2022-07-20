import { useState } from "react";
import Message from "../../data/message";
import Roulette from "../../data/roulette";
import User from "../../data/user";

type Params<T> = {
    userList: Array<User>;
    team1list: Array<string>;
    team2list: Array<string>;
    setPicked: (u: User) => void;
    setDlgUser: (b: boolean) => void;
    setChatList: (c: Array<Message>) => void;
};

const useRoulette = ({
    userList,
    team1list,
    team2list,
    setPicked,
    setDlgUser,
    setChatList,
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

        console.log(list);

        // 사용자 수 검사
        if (list.length > 0) {
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
            console.log("이용 가능한 인원 없음");
        }
    };

    const updateRoulette = (obj: Object) => {
        const user = userList.filter((x) => x.id === (obj as User).id)[0];
        setPicked(user);
    };

    const closeRoulette = () => {
        setDlgRoulette(false);
        setDlgUser(true);
    };

    return {
        dlgRoulette,
        setDlgRoulette,
        runRoulette,
    };
};

export default useRoulette;
