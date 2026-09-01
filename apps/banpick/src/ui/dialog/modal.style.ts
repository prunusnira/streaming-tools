import styled from "@emotion/styled";
import { BGGray, Dark, White } from "../pref/color.style";

export const DialogOuter = styled.section<{ active: boolean; zIdx?: number }>`
    width: 100%;
    height: 100%;
    background-color: ${BGGray};

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    ${(props) => !props.active && "display: none;"}
    ${(props) => props.zIdx && `z-index: ${props.zIdx};`}
`;

export const DialogContainer = styled.section<{ width: number | string; maxWidth: number }>`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: ${(props) => props.maxWidth}px;
    background-color: ${Dark};
    color: ${White};
    z-index: 10;
`;

export const DialogHeader = styled.div`
    font-size: 24px;
    background-color: ${Dark};
    color: ${White};
    padding: 10px;
`;

export const DialogBody = styled.div`
    font-size: 14px;
    padding: 10px 24px;
`;

export const DialogFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;
