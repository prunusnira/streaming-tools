import { type ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
    children: ReactNode;
    id: string;
};

export const Portal = ({ children, id }: PortalProps) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const existingContainer = document.getElementById(id);
        const element = existingContainer ?? document.createElement("div");

        if (!existingContainer) {
            element.id = id;
            document.body.append(element);
        }

        setContainer(element);

        return () => {
            if (!existingContainer) {
                element.remove();
            }
        };
    }, [id]);

    return container ? ReactDOM.createPortal(children, container) : null;
};
