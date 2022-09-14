import { useContext, useRef } from "react";
import { emptyUser, UserType } from "../../data/user";
import { ModalContext } from "../../lib/context/modalProvider";
import { TalkContext } from "../../lib/context/talkProvider";
import { TeamContext } from "../../lib/context/teamProvider";
import { makeRandom } from "../../lib/tool/random";
import RouletteDlg from "../../ui/dialog/roulette/rouletteDlg";
import RouletteDlgHeader from "../../ui/dialog/roulette/rouletteDlgHeader";
import RouletteErrorDlg from "../../ui/dialog/roulette/rouletteErrorDlg";
import RouletteErrorFooter from "../../ui/dialog/roulette/rouletteErrorFooter";
import RouletteErrorHeader from "../../ui/dialog/roulette/rouletteErrorHeader";

const useRoulette = () => {
    const target = useRef<UserType>(emptyUser);
    const roulette = useRef<NodeJS.Timeout>();
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
                body: <RouletteErrorDlg content={"현재 팀에 참여 가능한 시청자가 없습니다"} />,
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
            header: <RouletteDlgHeader />,
            body: <RouletteDlg list={rouletteUsers} />,
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

export default useRoulette;
