import { useContext, useRef } from "react";
import { emptyUser, UserType } from "@banpick/features/streamer/model/user";
import { ModalContext } from "@banpick/shared/modal/ModalProvider";
import { TalkContext } from "@banpick/features/chat/model/TalkProvider";
import { TeamContext } from "@banpick/features/banpick/model/TeamProvider";
import { makeRandom } from "./random";
import { RouletteDialog } from "@banpick/features/banpick/components/roulette/RouletteDialog";
import { RouletteDialogHeader } from "@banpick/features/banpick/components/roulette/RouletteDialogHeader";
import { RouletteErrorDialog } from "@banpick/features/banpick/components/roulette/RouletteErrorDialog";
import { RouletteErrorFooter } from "@banpick/features/banpick/components/roulette/RouletteErrorFooter";
import { RouletteErrorHeader } from "@banpick/features/banpick/components/roulette/RouletteErrorHeader";

export const useRoulette = () => {
    const target = useRef<UserType>(emptyUser);
    const roulette = useRef<NodeJS.Timeout | undefined>(undefined);
    const { userList } = useContext(TeamContext);
    const { changePickedUser, openTalkDialog, addTalkHistory } = useContext(TalkContext);
    const { openDialog, closeDialog } = useContext(ModalContext);

    const getRouletteUserList = (teamNum: number) => {
        // 현재 팀의 선택된 적이 없는 유저 리스트를 가져옴
        const list = userList.filter((x) => x.team === teamNum && !x.picked);
        // 선택된 리스트에서 20명을 추림
        // 시작 포인트를 골라서 처리함
        if (list.length > 20) {
            const start = makeRandom(0, list.length - 20);
            const sliced = list.slice(start, start + 20);

            return sliced;
        } else {
            // 전체 리스트 사용함
            return list;
        }
    };

    const runRoulette = (teamNum: number) => {
        const rouletteUsers = getRouletteUserList(teamNum);

        if (rouletteUsers.length === 0) {
            // 에러 표시하고 리턴
            openDialog({
                width: 420,
                maxWidth: 420,
                active: true,
                header: <RouletteErrorHeader />,
                body: <RouletteErrorDialog content={"현재 팀에 참여 가능한 시청자가 없습니다"} />,
                footer: <RouletteErrorFooter closeDialog={closeDialog} />,
            });
            return;
        }

        const num = makeRandom(0, rouletteUsers.length - 1);
        target.current = rouletteUsers[num];

        openDialog({
            width: 420,
            maxWidth: 420,
            active: true,
            header: <RouletteDialogHeader />,
            body: <RouletteDialog list={rouletteUsers} />,
            footer: undefined,
        });

        stopRoulette();
    };

    const stopRoulette = () => {
        setTimeout(() => {
            changePickedUser(target.current);
            clearInterval(roulette.current);
            closeDialog();

            addTalkHistory(target.current.recentChat);
            openTalkDialog();
        }, 3000);
    };

    return {
        runRoulette,
    };
};
