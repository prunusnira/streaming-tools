import { useEffect, useRef, useState } from "react";
import { UserType } from "@banpick/features/streamer/model/user";
import styles from "./RouletteDialog.module.css";

type Props = {
    list: Array<UserType>;
};

export const RouletteDialog = ({ list }: Props) => {
    const [sel, setSel] = useState(list[0].displayname);
    const txtRoulette = useRef<Array<NodeJS.Timeout>>([]);

    useEffect(() => {
        let idx = 0;
        txtRoulette.current.push(
            setInterval(() => {
                setSel(list[idx].displayname);
                console.log(idx, list[idx].displayname);
                idx++;
                if (idx === list.length) idx = 0;
            }, 100),
        );
        setTimeout(() => {
            clearRoulette();
        }, 3000);
    }, []);

    const clearRoulette = () => {
        txtRoulette.current.forEach((x) => {
            clearInterval(x);
        });
        txtRoulette.current.splice(0, txtRoulette.current.length);
    };

    return <section className={styles.stack}>{sel}</section>;
};
