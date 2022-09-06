import styled from "@emotion/styled";

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
`;

export const ItemTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const ItemTitlePick = styled.div`
    text-align: center;
`;

export const ItemTitleName = styled.div`
    text-align: center;
`;

export const ItemBody = styled.div`
    display: flex;
`;

export const ItemBodyContent = styled.div<{ isBanned: boolean }>`
    ${(props) => props.isBanned && `text-decoration: line-through;`}
    font-size: 24px;
`;

export const ItemFooter = styled.div``;

export const ItemBodyBtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ItemButton = styled.button``;
