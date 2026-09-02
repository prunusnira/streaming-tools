import { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
    createRootRoute,
    createRoute,
    createRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "@tanstack/react-router";
import "@streaming-tools/ui/globals.css";
import { Loading } from "@streaming-tools/ui";
import { saveAccessTokenFromHash } from "@banpick/features/streamer/logic/login/oauthAccessToken";
import { ErrorBoundary } from "./ErrorBoundary";

const BanpickApp = lazy(async () => {
    const { BanpickRoot } = await import("@streaming-tools/banpick");
    return { default: BanpickRoot };
});

const rootRoute = createRootRoute({
    component: Outlet,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: RootRedirect,
});

const banpickRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/banpick",
    component: BanpickRoute,
});

const routeTree = rootRoute.addChildren([indexRoute, banpickRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function BanpickRoute() {
    return (
        <Suspense
            fallback={<Loading className="min-h-screen bg-surface text-slate-100" />}
        >
            <BanpickApp />
        </Suspense>
    );
}

function RootRedirect() {
    const [canRedirect, setCanRedirect] = useState(false);

    useEffect(() => {
        saveAccessTokenFromHash(window.location.hash);
        setCanRedirect(true);
    }, []);

    if (!canRedirect) {
        return <Loading className="min-h-screen bg-surface text-slate-100" />;
    }

    return <Navigate to="/banpick" replace />;
}

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ErrorBoundary>
        <RouterProvider router={router} />
    </ErrorBoundary>
);
