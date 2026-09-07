import serverless from "serverless-http";
import { app } from "./app.js";

export { app };
export const handler = serverless(app, { basePath: "/streaming" });
