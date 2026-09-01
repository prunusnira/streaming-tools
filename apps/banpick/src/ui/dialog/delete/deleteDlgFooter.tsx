import { DeleteBtnWrapper, DeleteButton } from "./deleteDlgFooter.style";

type Props = {
    team: number;
    idx: number;
    deleteMessage: (team: number, idx: number) => void;
    closeDialog: () => void;
};

const DeleteDlgFooter = ({ team, idx, deleteMessage, closeDialog }: Props) => {
    return (
        <DeleteBtnWrapper>
            <DeleteButton onClick={closeDialog}>아니오</DeleteButton>
            <DeleteButton onClick={() => deleteMessage(team, idx)}>네</DeleteButton>
        </DeleteBtnWrapper>
    );
};

export default DeleteDlgFooter;
