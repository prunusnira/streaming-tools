import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@streaming-tools/ui/globals.css";
import { Loading } from "@streaming-tools/ui";
import { ErrorBoundary } from "./ErrorBoundary";

const BanpickApp = lazy(async () => {
    const { BanpickRoot } = await import("@streaming-tools/banpick");
    return { default: BanpickRoot };
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ErrorBoundary>
        <Suspense
            fallback={<Loading className="min-h-screen bg-surface text-slate-100" />}
        >
            <BanpickApp />
        </Suspense>
    </ErrorBoundary>
);
