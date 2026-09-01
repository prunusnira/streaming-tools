import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@streaming-tools/ui/globals.css";
import ErrorBoundary from "./ErrorBoundary";

const BanpickApp = lazy(() => import("@streaming-tools/banpick"));

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ErrorBoundary>
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-surface text-slate-100">
                    <span aria-label="로딩 중" className="size-8 animate-spin rounded-full border-4 border-slate-600 border-t-slate-100" />
                </div>
            }
        >
            <BanpickApp />
        </Suspense>
    </ErrorBoundary>
);
