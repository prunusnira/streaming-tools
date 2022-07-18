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
        // 이미 선택된 유저 제외
        const users =
            teamNum === 1
                ? team1list.filter((x) => userList.filter((u) => u.id === x && !u.picked))
                : team2list.filter((x) => userList.filter((u) => u.id === x && !u.picked));

        // 사용자 수 검사
        if (users.length > 0) {
            // 다이얼로그 열기
            setDlgRoulette(true);

            // 현재 목록에서 유저 선택
            let randVal = Math.floor(Math.random() * users.length);
            if (randVal == users.length) randVal--;

            // 룰렛 선택 표기
            const roulette = new Roulette(users, false);

            roulette.setupPos(randVal);
            roulette.start();
            roulette.roulette(updateRoulette);
            roulette.stop((obj: Object) => {
                updateRoulette(users[randVal]);
                setChatList([userList.filter((x) => x.id === users[randVal])[0].lastChat]);
                setTimeout(closeRoulette, 1000);
            }, 3);
        } else {
            // alert 표기
            console.log("이용 가능한 인원 없음");
        }
    };

    const updateRoulette = (obj: Object) => {
        const user = userList.filter((x) => x.id === (obj as string))[0];
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
