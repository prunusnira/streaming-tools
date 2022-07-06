import styled from "styled-components";
import { Gray } from "../../../commonStyle/color";
import { FontReg14, FontReg18, FontReg24 } from "../../../commonStyle/font";

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    ${FontReg14}
    line-height: 16px;
    padding: 10px 0;
`;

export const Col = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${Gray};
`;

export const ColLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
`;

export const Title = styled.h1`
    ${FontReg24}
    line-height: 26px;
    padding: 10px 0;
`;

export const SubTitle = styled.h2`
    ${FontReg18}
    line-height: 20px;
    padding: 10px 0;
`;

export const UnorderList = styled.ul``;

export const OrderList = styled.ol``;

export const ListItem = styled.li`
    ${FontReg14}
    line-height: 30px;
`;
