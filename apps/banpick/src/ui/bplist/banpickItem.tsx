import { useContext } from "react";
import { Message } from "../../data/message";
import { Phase } from "../../data/status";
import { StatusContext } from "../../lib/context/statusProvider";
import {
    ItemBody,
    ItemBodyBtnWrapper,
    ItemBodyContent,
    ItemButton,
    ItemContainer,
    ItemFooter,
    ItemTitle,
    ItemTitleName,
    ItemTitlePick,
} from "./banpickItem.style";

type Props = {
    team: number;
    item: Message;
    idx: number;
    changeBanStatus: (tn: number, idx: number) => void;
    openEditDialog: (teamNum: number, idx: number, msg: Message) => void;
    openDeleteDialog: (teamNum: number, idx: number) => void;
    openNegoMode: (id: string) => void;
};

const BanpickItem = ({
    team,
    item,
    idx,
    changeBanStatus,
    openEditDialog,
    openDeleteDialog,
    openNegoMode,
}: Props) => {
    const { data } = useContext(StatusContext);
    return (
        <ItemContainer>
            <ItemTitle>
                <ItemTitlePick>PICK {idx + 1}</ItemTitlePick>
                <ItemTitleName>by {item.name}</ItemTitleName>
            </ItemTitle>
            <ItemBody>
                <ItemBodyContent isBanned={item.ban}>{item.msg}</ItemBodyContent>
            </ItemBody>
            <ItemFooter>{item.timeInTxt}</ItemFooter>
            <ItemBodyBtnWrapper>
                <ItemButton onClick={() => openEditDialog(team, idx, item)}>수정</ItemButton>
                <ItemButton onClick={() => openDeleteDialog(team, idx)}>삭제</ItemButton>
                <ItemButton onClick={() => openNegoMode(item.id)}>협상</ItemButton>
                <ItemButton
                    disabled={data.phase !== Phase.Ban}
                    onClick={() => changeBanStatus(team, idx)}
                >
                    {item.ban && "언밴"}
                    {!item.ban && "밴"}
                </ItemButton>
            </ItemBodyBtnWrapper>
        </ItemContainer>
    );
};

export default BanpickItem;
