import styled from "styled-components";
import { FontReg16 } from "../../../commonStyle/font";

export const PhaseWrapper = styled.section`
    flex: 1;
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    padding-right: 16px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${FontReg16}
`;
