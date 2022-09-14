import { useContext } from "react";
import { UserType } from "../../data/user";
import { TalkContext } from "../../lib/context/talkProvider";
import { TeamItemCover } from "./teamItem.style";

type Props = {
    children: React.ReactNode;
    picked: UserType;
    changePickedState: () => void;
};

const TeamItem = ({ children, picked, changePickedState }: Props) => {
    const { openTalkDialog, changeNegoMode, changePickedUser } = useContext(TalkContext);
    return (
        <TeamItemCover
            picked={picked.picked}
            onClick={changePickedState}
            onContextMenu={(e) => {
                // 해당 유저에 대한 컨텍스트 메뉴 열기
                e.preventDefault();
                changeNegoMode(true);
                changePickedUser(picked);
                openTalkDialog();
            }}
        >
            {children}
        </TeamItemCover>
    );
};

export default TeamItem;
