import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    define: {
        // banpick의 치지직 socket.io-client 2.x가 브라우저 전역값을 참조해 globalThis로 연결해.
        global: "globalThis",
    },
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
