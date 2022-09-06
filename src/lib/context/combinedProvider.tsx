import React from "react";

type CombineProps = {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
    children: React.ReactNode;
};

const CombinedProviders = ({ components = [], children }: CombineProps) => {
    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>;
            }, children)}
        </>
    );
};

export default CombinedProviders;
