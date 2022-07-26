import styled from "styled-components";
import { FontReg16 } from "../../commonStyle/font";

export const TNWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TNCurrent = styled.div`
    ${FontReg16}
`;

export const TNInput = styled.input.attrs({ type: "text" })``;
