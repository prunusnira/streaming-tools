import styled from "@emotion/styled";

export const ConfigContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const ConfigBtnGroup = styled.div`
    flex: 2;
    width: 100%;
`;

export const ConfigCtrl = styled.div`
    flex: 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

export const ConfigPhaseWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ConfigPhase = styled.div`
    flex: 1;
    text-align: center;
    font-size: 20px;
`;

export const PhaseChangeBtn = styled.button``;

export const ConfButton = styled.button<{ bgColor: string }>`
    padding: 10px 20px;
`;
