import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    resolve: {
        alias: {
            "@banpick": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    plugins: [react(), tailwindcss()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.ts",
    },
});
