import styled from "styled-components";
import { Gray, LightGray, White } from "../../../commonStyle/color";
import { FontReg14, FontReg16, FontReg18 } from "../../../commonStyle/font";

export const TitleWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 8px;
`;

export const TitleIcon = styled.img`
    width: 35px;
    height: 35px;
`;

export const TitleUserName = styled.div`
    ${FontReg16}
`;

export const TitleUserId = styled.div`
    ${FontReg14}
`;

export const TitleSub = styled.div`
    ${FontReg14}
`;

export const TitleDesc = styled.div`
    ${FontReg14}
`;

export const ChatWrapper = styled.section`
    height: 650px;
`;

export const ChatBox = styled.div`
    display: flex;
    flex-direction: row;

    border: 1px solid ${White};
    border-radius: 24px;
    padding: 10px 20px;
`;

export const ChatBoxLeft = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-right: 10px;
`;

export const ChatTimeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const ChatTime = styled.div`
    ${FontReg14}
    color: ${LightGray};
`;

export const ChatMsg = styled.div`
    ${FontReg18}
`;

export const ChatBtn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const DlgFooter = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`;
