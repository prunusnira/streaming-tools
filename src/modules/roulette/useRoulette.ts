import { useEffect, useState } from "react";
import Roulette from "../../data/roulette";
import User, { emptyUser } from "../../data/user";

type Params<T> = {
    list: Array<T>;
    openUserDialog: () => void;
};

const useRoulette = ({ list, openUserDialog }: Params<User>) => {
    const [isRouletteRunning, setRouletteRunning] = useState(false);
    const [rouletteArray, setRouletteArray] = useState<Array<User>>([]);
    const [rouletteUser, setRouletteUser] = useState(emptyUser);
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (isRouletteRunning) {
            // 현재 목록에서 유저 선택
            let randVal = Math.floor(Math.random() * rouletteArray.length);
            if (randVal == rouletteArray.length) randVal--;

            // 룰렛 선택 표기
            const roulette = new Roulette(rouletteArray, false);

            roulette.setupPos(randVal);
            roulette.start();
            roulette.roulette(updateRoulette);
            roulette.stop((obj: Object) => {
                updateRoulette(rouletteArray[randVal]);
                openUserDialog();
                setTimeout(closeRoulette, 1000);
            }, 3);
        }
    }, [isRouletteRunning]);

    const pickRange = () => {};

    const updateRoulette = (obj: Object) => {
        setRouletteUser(obj as User);
    };

    const closeRoulette = () => {
        setRouletteArray([]);
        setRouletteUser(emptyUser);
        setActive(false);
    };

    return {
        isActive,
        rouletteUser,
    };
};

export default useRoulette;
