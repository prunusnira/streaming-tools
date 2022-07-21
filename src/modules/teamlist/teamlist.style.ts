import styled from "styled-components";
import { Dark } from "../../commonStyle/color";
import { FontMed18 } from "../../commonStyle/font";

export const TeamListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const TeamListHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: ${Dark};
`;

export const TeamListHeaderSub = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: ${Dark};
`;

export const TeamListBody = styled.div`
    flex: 1;
`;

export const TLRow = styled.div<{ fontBig?: boolean; align?: string }>`
    text-align: ${(props) => (props.align ? props.align : "center")};
    width: 100%;

    ${(props) => props.fontBig && `${FontMed18}`}
`;

export const TLAnchor = styled.a`
    display: flex;
    flex-direction: row;
`;

export const TLEmpty = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 30%;
    ${FontMed18}
`;
