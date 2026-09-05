import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "@streaming-tools/ui/globals.css";
import { ErrorBoundary } from "@main/ErrorBoundary";
import { router } from "@main/router/router";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <ErrorBoundary>
        <RouterProvider router={router} />
    </ErrorBoundary>,
);
