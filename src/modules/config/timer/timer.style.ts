import styled from "styled-components";

export const TimerWrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70px;
`;

export const TimerRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TimerValue = styled.div`
    font-size: 15px;
    font-weight: bold;
`;
