import styled from "styled-components";
import { Gray } from "../../commonStyle/color";
import { FontMed18, FontReg14, FontReg24 } from "../../commonStyle/font";

export const HeaderWrapper = styled.header`
    height: 100px;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
`;

export const HeaderTitle = styled.div`
    ${FontReg24}
    text-align: center;
    padding-left: 16px;
`;

export const HeaderUser = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`;

export const UserIcon = styled.img`
    width: 50px;
    height: 50px;
    border: 1px solid ${Gray};
`;

export const UserName = styled.div`
    ${FontMed18}
`;

export const UserId = styled.div`
    ${FontReg14}
`;

export const HeaderButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-right: 16px;
`;
