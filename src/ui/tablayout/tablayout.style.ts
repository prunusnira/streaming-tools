import styled from "@emotion/styled";

export const TabLayoutContainer = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

export const TabPlacement = styled.section`
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TabFragment = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TabChat = styled.section`
    width: 300px;
    height: 100%;

    iframe {
        height: 100%;
    }
`;
