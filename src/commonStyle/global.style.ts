import styled, { createGlobalStyle } from "styled-components";
import { BGGray, Black, Dark, Orange, White } from "./color";
import { FontReg16 } from "./font";

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
    height: 100%;
    font-size: 95%;
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
`;

export const BPButton = styled.button<{ bgColor?: string; color?: string; reversed?: boolean }>`
    ${FontReg16}
    color: ${(props) => (props.color ? props.color : Dark)};
    background-color: ${(props) => (props.bgColor ? props.bgColor : Orange)};
    border: none;
    padding: 10px 24px;
    border-radius: 10px;
`;
