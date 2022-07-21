import styled from "styled-components";

export const ControlWrapper = styled.section`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 10px;
`;

export const ControlBtnArea = styled.section`
    flex: 1;
    width: 300px;
    max-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 16px;
`;

export const ControlBtnRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const ControlSelectArea = styled.section`
    flex: 1;
    width: 300px;
    max-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

export const ControlSelector = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ControlSelTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ControlSelBottom = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
`;

export const ControlSelNum = styled.input`
    width: 40px;
    height: 100%;
    text-align: center;
    border: none;

    // input number 옆에 화살표 가리기
    /* Chrome, Safari, Edge, Opera */
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    -moz-appearance: textfield;
`;
