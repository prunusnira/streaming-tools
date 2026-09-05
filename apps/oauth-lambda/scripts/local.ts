import { createServer } from "node:http";
import { app } from "../src/handler.js";

const port = Number(process.env.OAUTH_LOCAL_PORT ?? 3000);

createServer(app).listen(port, () => {
    console.log(`OAuth Lambda local server: http://localhost:${port}`);
});
