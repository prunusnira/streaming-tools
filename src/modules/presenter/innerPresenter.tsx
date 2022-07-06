import React from "react";

type Props = {
    Component: JSX.Element;
};

const InnerPresenter = ({ Component }: Props) => {
    return <>{Component}</>;
};

export default InnerPresenter;
