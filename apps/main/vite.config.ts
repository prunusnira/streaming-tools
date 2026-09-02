import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    publicDir: "../banpick/public",
    resolve: {
        alias: {
            "@banpick": fileURLToPath(new URL("../banpick/src", import.meta.url)),
        },
    },
    plugins: [react(), tailwindcss()],
});
