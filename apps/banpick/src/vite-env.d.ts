/// <reference types="vite/client" />

declare module "react-dom" {
    import type { ReactNode, ReactPortal } from "react";

    export function createPortal(children: ReactNode, container: Element | DocumentFragment): ReactPortal;
}

interface ImportMetaEnv {
    readonly VITE_URL_LOGIN?: string;
    readonly VITE_URL_VALIDATE?: string;
    readonly VITE_URL_PROFILE?: string;
    readonly VITE_URL_IRC?: string;
    readonly VITE_CLIENT_ID?: string;
    readonly VITE_CLIENT_ID_TEST?: string;
    readonly VITE_REDIR_URI?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
