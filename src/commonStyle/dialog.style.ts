import styled from "styled-components";
import { BGGray, Black, Dark, LightGray, White } from "./color";
import { FontReg14, FontReg24 } from "./font";

export const DialogOuter = styled.section<{ active: boolean }>`
    width: 100%;
    height: 100%;
    background-color: ${BGGray};

    position: absolute;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${(props) => !props.active && "display: none;"}
`;

export const DialogContainer = styled.section<{ width: number | string; maxWidth: number }>`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: ${(props) => props.maxWidth}px;
    background-color: ${Dark};
    color: ${White};
    z-index: 10;
    border-radius: 24px;
`;

export const DialogHeader = styled.div`
    ${FontReg24}
    border-bottom: 1px solid ${Black};
    background-color: ${LightGray};
    color: ${Dark};
    padding: 10px;
    border-radius: 24px 24px 0 0;
`;

export const DialogBody = styled.div`
    ${FontReg14}
    padding: 10px 24px;
`;

export const DialogFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${BGGray};
    padding: 10px;
`;
