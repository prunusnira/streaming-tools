import styled from "styled-components";
import { FontMed18 } from "../../commonStyle/font";

export const TeamListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const TeamListHeader = styled.div``;

export const TeamListBody = styled.div``;

export const TLRow = styled.div<{ fontBig?: boolean }>`
    text-align: center;

    ${(props) => props.fontBig && `${FontMed18}`}
`;
