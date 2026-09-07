import { Router } from "express";
import { getUsableAccessToken } from "../auth/session.js";
import { getProvider } from "../providers/index.js";

export const chatRouter = Router();

chatRouter.post("/chat/chzzk/session", (request, response, next) => {
    const provider = getProvider("chzzk");
    const createChatSession = provider?.createChatSession;
    if (!provider || !createChatSession) return response.sendStatus(501);
    void getUsableAccessToken(request, response, provider)
        .then(async (accessToken) => {
            if (!accessToken) return response.sendStatus(401);
            const session = await createChatSession({ accessToken });
            return response.json(session);
        })
        .catch(next);
});

chatRouter.post("/chat/chzzk/subscriptions", (request, response, next) => {
    const provider = getProvider("chzzk");
    const subscribeToChat = provider?.subscribeToChat;
    const sessionKey = request.query.sessionKey;
    if (!provider || !subscribeToChat) return response.sendStatus(501);
    if (typeof sessionKey !== "string" || !sessionKey) return response.sendStatus(400);
    void getUsableAccessToken(request, response, provider)
        .then(async (accessToken) => {
            if (!accessToken) return response.sendStatus(401);
            await subscribeToChat({ accessToken, sessionKey });
            return response.sendStatus(204);
        })
        .catch(next);
});
