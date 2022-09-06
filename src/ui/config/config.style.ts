import styled from "@emotion/styled";

export const ConfigContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const ConfigBtnGroup = styled.div`
    flex: 2;
`;

export const ConfigCtrl = styled.div`
    flex: 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

export const ConfigPhase = styled.div`
    flex: 1;
    text-align: center;
`;

export const ConfButton = styled.button<{ bgColor: string }>`
    width: 200px;
    height: 48px;
    padding: 10px 20px;
`;
