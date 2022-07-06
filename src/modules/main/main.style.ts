import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const TabLayout = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const TabButton = styled.button<{ activate: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    ${(props) =>
        props.activate
            ? `
    background-color: white;
    `
            : `
            background-color: white;
    `}
`;

export const MainLayout = styled.section`
    flex: 1;
    display: flex;
    flex-direction: row;

    width: 100%;
`;

export const DataWrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
`;
