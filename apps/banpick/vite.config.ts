import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    define: {
        // socket.io-client 2.x가 Node 호환 전역값을 참조해 브라우저에서 globalThis로 연결해.
        global: "globalThis",
    },
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
