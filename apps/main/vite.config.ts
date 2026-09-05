import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    publicDir: "../banpick/public",
    resolve: {
        alias: {
            "@main": fileURLToPath(new URL("./src", import.meta.url)),
            "@account": fileURLToPath(new URL("../account/src", import.meta.url)),
            "@banpick": fileURLToPath(new URL("../banpick/src", import.meta.url)),
            "@misc": fileURLToPath(new URL("../misc/src", import.meta.url)),
        },
    },
    plugins: [react(), tailwindcss()],
});
