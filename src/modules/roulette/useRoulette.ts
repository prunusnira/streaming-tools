import { useState } from "react";
import Roulette from "../../data/roulette";
import User, { emptyUser } from "../../data/user";

type Params<T> = {
    members: Array<T>;
};

const useRoulette = ({ members }: Params<User>) => {
    // 룰렛
    const [dlgRoulette, setDlgRoulette] = useState(false);
    const [pickedUser, setPickedUser] = useState<User>(emptyUser);

    const runRoulette = () => {
        // 이미 선택된 유저 제외
        const users = members.filter((x) => !x.picked);

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
                setTimeout(closeRoulette, 1000);
            }, 3);
        } else {
            // alert 표기
            console.log("이용 가능한 인원 없음");
        }
    };

    const updateRoulette = (obj: Object) => {
        setPickedUser(obj as User);
    };

    const closeRoulette = () => {
        setDlgRoulette(false);
    };

    return {
        dlgRoulette,
        setDlgRoulette,
        pickedUser,
        runRoulette,
    };
};

export default useRoulette;
