import styled, { createGlobalStyle } from "styled-components";
import { BGDark, BGGray, Black, Dark, Orange, White } from "./color";
import { FontReg14, FontReg16 } from "./font";

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
    height: 100%;
    font-size: 95%;
    background-color: ${BGDark};
    color: ${White};
    }

    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    a {
        text-decoration: none;
        color: ${White};
        &:hover {
            color: ${White};
            text-decoration: underline;
        }
    }
`;

export const BPButton = styled.button<{
    bgColor?: string;
    color?: string;
    reversed?: boolean;
    disabled?: boolean;
    borderRadius?: number;
}>`
    ${FontReg16}
    color: ${(props) => (props.color ? props.color : Dark)};
    background-color: ${(props) =>
        props.disabled ? BGGray : props.bgColor ? props.bgColor : Orange};
    border: none;
    padding: 10px 24px;
    border-radius: ${(props) => (props.borderRadius ? `${props.borderRadius}px` : "10px")};
    width: 100%;
    height: 40px;
`;

export const BtnWrapper = styled.div<{ width: number }>`
    width: ${(props) => props.width}px;
`;

export const MiniButton = styled.button<{ disabled?: boolean }>`
    ${FontReg14}
    color: ${Dark};
    background-color: ${Orange};
    border: none;
    width: 100%;

    ${(props) => props.disabled && `background-color: ${BGGray}`}
`;
