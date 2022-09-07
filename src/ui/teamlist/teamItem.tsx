import { TeamItemCover } from "./teamItem.style";

type Props = {
    children: React.ReactNode;
    isPicked: boolean;
    changePickedState: () => void;
};

const TeamItem = ({ children, isPicked, changePickedState }: Props) => {
    return (
        <TeamItemCover picked={isPicked} onClick={changePickedState}>
            {children}
        </TeamItemCover>
    );
};

export default TeamItem;
