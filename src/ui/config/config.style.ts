import styled from "@emotion/styled";

export const ConfigContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const ConfigBtnGroup = styled.div`
    width: 450px;
`;

export const ConfigCtrl = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 450px;
`;

export const ConfigPhaseWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
`;

export const ConfigPhase = styled.div`
    flex: 1;
    text-align: center;
    font-size: 20px;
`;

export const PhaseChangeBtn = styled.button``;

export const ConfSButton = styled.button<{ run: boolean; join: boolean }>`
    width: 150px;
    padding: 10px 20px;
    ${(props) => !props.run && `background-color: #e83737; color: white;`}
`;

export const ConfButton = styled.button`
    width: 150px;
    padding: 10px 20px;
    background-color: #fef8e8;
`;
