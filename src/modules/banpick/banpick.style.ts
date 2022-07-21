import styled from "styled-components";
import { BGGray, Dark, White } from "../../commonStyle/color";
import { FontMed18 } from "../../commonStyle/font";

export const BanPickWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const BanPickTitle = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${Dark};
    padding: 10px;
    text-align: center;
    color: ${White};
`;

export const BPRow = styled.div<{ fontBig?: boolean }>`
    width: 100%;

    ${(props) => props.fontBig && `${FontMed18}`}
`;

export const BanPickBody = styled.div`
    flex: 1;
    border: 1px solid ${White};
    overflow-y: auto;
`;

export const BPWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid ${White};
    border-radius: 24px;
`;

export const BPNum = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 8px;
`;

export const BPMid = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const BPMidUp = styled.div``;

export const BPMidBot = styled.div``;

export const BPMessage = styled.div`
    ${FontMed18}
`;

export const BPTime = styled.div``;

export const BPName = styled.div``;

export const BPButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BPEditTxt = styled.div``;

export const BPEditInput = styled.input.attrs({ type: "text" })`
    width: 100%;
`;
