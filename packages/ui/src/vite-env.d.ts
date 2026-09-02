declare module "*.module.css" {
    const classes: Record<string, string>;
    export default classes;
}

declare module "react-dom" {
    import type { ReactNode, ReactPortal } from "react";

    export function createPortal(children: ReactNode, container: Element | DocumentFragment): ReactPortal;
}
