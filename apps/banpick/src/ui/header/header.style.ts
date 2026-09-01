import styled from "@emotion/styled";

export const HeaderContainer = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100px;
`;

export const HeaderItem = styled.div<{ fontSize?: number; position?: string }>`
    flex: 1;
    padding: 10px 20px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : 18)}px;

    display: flex;
    flex-direction: row;
    justify-content: ${(props) => (props.position ? props.position : "center")};
    align-items: center;
`;

export const HeaderIcon = styled.img`
    width: 50px;
    height: 50px;
`;

export const HeaderButton = styled.button<{ color: string; bgColor: string }>`
    padding: 20px;
    ${(props) => props.color && `color: ${props.color};`}
    ${(props) => props.bgColor && `background-color: ${props.bgColor};`}
    border-radius: 10px;
`;
