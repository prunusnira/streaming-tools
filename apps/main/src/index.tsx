import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";

const BanpickApp = lazy(() => import("@streaming-tools/banpick"));

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ErrorBoundary>
        <Suspense fallback={<div>LOADING</div>}>
            <BanpickApp />
        </Suspense>
    </ErrorBoundary>
);
