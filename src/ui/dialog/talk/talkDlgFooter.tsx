import { useContext } from "react";
import { TalkContext } from "../../../lib/context/talkProvider";
import { TalkFooterContainer, TalkFooterBtn } from "./talkDlgFooter.style";

type Props = {
    skipDialog: () => void;
    cancelDialog: () => void;
};

const TalkDlgFooter = ({ skipDialog, cancelDialog }: Props) => {
    const { negoMode } = useContext(TalkContext);
    return (
        <TalkFooterContainer>
            {!negoMode && <TalkFooterBtn onClick={skipDialog}>스킵</TalkFooterBtn>}
            <TalkFooterBtn onClick={cancelDialog}>취소</TalkFooterBtn>
        </TalkFooterContainer>
    );
};

export default TalkDlgFooter;
