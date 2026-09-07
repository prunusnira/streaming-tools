import { authProviders, type AuthAccount } from "@streaming-tools/auth";
import { type Request, type Response, Router } from "express";
import {
    clearProviderCookies,
    getAccountFromCookies,
    getUsableAccessToken,
} from "../auth/session.js";
import { getProvider } from "../providers/index.js";

export const accountRouter = Router();

const sendAuthenticatedAccounts = async (request: Request, response: Response) => {
    const accounts: AuthAccount[] = [];
    for (const providerId of authProviders) {
        const provider = getProvider(providerId);
        if (!provider) continue;
        const accessToken = await getUsableAccessToken(request, response, provider);
        const account = accessToken ? getAccountFromCookies(request.cookies, providerId) : null;
        if (account) accounts.push(account);
    }
    return accounts.length ? response.json({ accounts }) : response.sendStatus(401);
};

accountRouter.get("/sessions", (request, response, next) => {
    void sendAuthenticatedAccounts(request, response).catch(next);
});
// 이전 프런트 배포본과의 호환을 위한 읽기 전용 alias야.
accountRouter.get("/account", (request, response, next) => {
    void sendAuthenticatedAccounts(request, response).catch(next);
});

accountRouter.post("/sessions/:provider/access-token", (request, response, next) => {
    const provider = getProvider(request.params.provider);
    if (!provider) return response.sendStatus(404);
    void getUsableAccessToken(request, response, provider)
        .then((accessToken) => {
            if (!accessToken) return response.sendStatus(401);
            response.setHeader("Cache-Control", "no-store");
            return response.json({ accessToken, provider: provider.id });
        })
        .catch(next);
});

const logoutAllAccounts = (_request: Request, response: Response) => {
    authProviders.forEach((provider) => clearProviderCookies(response, provider));
    response.sendStatus(204);
};

accountRouter.delete("/sessions", logoutAllAccounts);
// 이전 프런트 배포본과의 호환을 위한 alias야.
accountRouter.post("/logout", logoutAllAccounts);
accountRouter.delete("/sessions/:provider", (request, response) => {
    const provider = getProvider(request.params.provider);
    if (!provider) return response.sendStatus(404);
    clearProviderCookies(response, provider.id);
    return response.sendStatus(204);
});
