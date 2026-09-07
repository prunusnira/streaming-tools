import { lazy, Suspense } from "react";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { AccountPage, LoginPage } from "@account";
import { MiscPage } from "@misc";
import { AppLayout } from "@main/layout/AppLayout";
import { Loading } from "@streaming-tools/ui";

const LazyBanpickRoot = lazy(async () => {
    const { BanpickRoot } = await import("@banpick/BanpickRoot");
    return { default: BanpickRoot };
});

const rootRoute = createRootRoute({
    component: AppLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: MiscPage,
});

const miscRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/misc",
    component: MiscPage,
});

const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account",
    component: AccountPage,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/account/login",
    component: LoginPage,
});

const banpickRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/banpick",
    component: BanpickRoute,
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
    miscRoute,
    accountRoute,
    loginRoute,
    banpickRoute,
]);

function BanpickRoute() {
    return (
        <Suspense fallback={<Loading className="min-h-screen bg-surface text-slate-100" />}>
            <LazyBanpickRoot />
        </Suspense>
    );
}
