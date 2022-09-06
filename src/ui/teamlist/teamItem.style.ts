import styled from "@emotion/styled";

export const TeamItemCover = styled.div<{ picked: boolean }>`
    ${(props) => props.picked && "text-decoration: line-through"}
`;
