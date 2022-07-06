import styled from "styled-components";
import { BGGray, White } from "../../commonStyle/color";

export const BanPickWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const BanPickTitle = styled.div`
    background-color: ${BGGray};
    padding: 10px;
    text-align: center;
    color: ${White};
`;

export const BanPickBody = styled.div`
    flex: 1;
    border: 1px solid black;
    overflow-y: auto;
`;
