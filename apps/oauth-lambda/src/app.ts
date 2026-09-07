import cookieParser from "cookie-parser";
import express from "express";
import { cors } from "./middleware/cors.js";
import { accountRouter } from "./routes/account.js";
import { chatRouter } from "./routes/chat.js";
import { oauthRouter } from "./routes/oauth.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

app.use(oauthRouter);
app.use(accountRouter);
app.use(chatRouter);

app.use(
    (
        _error: unknown,
        _request: express.Request,
        response: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(_error instanceof Error ? _error.message : "OAuth 처리 오류");
        response.sendStatus(500);
    },
);
