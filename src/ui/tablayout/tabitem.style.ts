import styled from "@emotion/styled";

export const TabButton = styled.button<{ active: boolean }>`
    width: 100%;
    height: 100%;
    border: none;

    ${(props) =>
        props.active &&
        `
    font-weight: bold;
    background-color: #fff8d3;
    `}
`;
