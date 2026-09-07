import { authCookieNames } from "@streaming-tools/auth";
import { Router } from "express";
import { appOrigin, publicApiBaseUrl } from "../config.js";
import {
    cookieOptions,
    createLoginSession,
    getParameter,
    setProviderTokens,
} from "../auth/session.js";
import { getProvider } from "../providers/index.js";

export const oauthRouter = Router();

oauthRouter.post("/sessions/:provider", (request, response, next) => {
    try {
        const provider = getProvider(request.params.provider);
        if (!provider) return response.sendStatus(404);
        return response.json({ authorizationUrl: createLoginSession(response, provider.id) });
    } catch (error) {
        next(error);
    }
});

// 이전 로그인 URL을 사용하는 클라이언트를 위한 호환 경로야.
oauthRouter.get("/login/:provider", (request, response, next) => {
    try {
        const provider = getProvider(request.params.provider);
        if (!provider) return response.sendStatus(404);
        return response.redirect(createLoginSession(response, provider.id));
    } catch (error) {
        next(error);
    }
});

oauthRouter.get("/callback/:provider", async (request, response, next) => {
    try {
        const provider = getProvider(request.params.provider);
        const [savedProvider, savedState] = (
            request.cookies?.["streaming-oauth-state"] ?? ""
        ).split(":");
        const code = typeof request.query.code === "string" ? request.query.code : undefined;
        const state = typeof request.query.state === "string" ? request.query.state : undefined;
        if (
            !provider ||
            savedProvider !== request.params.provider ||
            (provider.usesState !== false && savedState !== state) ||
            !code
        )
            return response.status(400).send("잘못된 로그인 요청이야.");

        const clientSecret = await getParameter(provider.clientSecretParameter);
        const redirectUri = `${publicApiBaseUrl}/callback/${request.params.provider}`;
        let token;
        try {
            token = await provider.exchangeAuthorizationCode({
                clientId: provider.clientId,
                clientSecret,
                code,
                redirectUri,
                state: savedState,
            });
        } catch {
            return response.status(502).send("로그인 token 교환에 실패했어.");
        }
        if (!token.accessToken || !token.refreshToken)
            return response.status(502).send("로그인 token 교환에 실패했어.");

        let user;
        try {
            user = provider.getUser
                ? await provider.getUser({
                      accessToken: token.accessToken,
                      clientId: provider.clientId,
                      clientSecret,
                  })
                : undefined;
        } catch {
            return response.status(502).send("로그인 사용자 정보 조회에 실패했어.");
        }
        if (!user) return response.status(502).send("로그인 사용자 정보를 지원하지 않는 서비스야.");

        const cookieNames = authCookieNames[provider.id];
        setProviderTokens(response, provider.id, token);
        response.cookie(
            cookieNames.user,
            JSON.stringify(user),
            cookieOptions(30 * 24 * 60 * 60 * 1000),
        );
        response.clearCookie("streaming-oauth-state", cookieOptions());
        return response.redirect(`${appOrigin}/account`);
    } catch (error) {
        next(error);
    }
});
