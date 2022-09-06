import styled from "@emotion/styled";

export const TeamItemCover = styled.div<{ picked: boolean }>`
    padding: 5px 20px;
    ${(props) => props.picked && "text-decoration: line-through"}
`;
