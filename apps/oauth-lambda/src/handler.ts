import crypto from "node:crypto";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import {
    authCookieNames,
    authProviders,
    type AuthAccount,
    type AuthProvider,
} from "@streaming-tools/auth";
import cookieParser from "cookie-parser";
import express, { type CookieOptions } from "express";
import serverless from "serverless-http";
import { appOrigin, publicApiBaseUrl } from "./config.js";
import { getProvider } from "./providers/index.js";

export const app = express();
const ssm = new SSMClient({});

const getParameter = async (name: string | undefined) => {
    if (!name) throw new Error("Parameter Store 이름이 설정되지 않았어.");
    const result = await ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true }));
    return result.Parameter?.Value ?? "";
};

const cookieOptions = (maxAge?: number): CookieOptions => ({
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
});
const clearProviderCookies = (response: express.Response, provider: AuthProvider) => {
    const cookieNames = authCookieNames[provider];
    const clearOptions: CookieOptions = {
        ...cookieOptions(),
        expires: new Date(0),
        maxAge: 0,
    };
    response.clearCookie(cookieNames.accessToken, clearOptions);
    response.clearCookie(cookieNames.expiresAt, clearOptions);
    response.clearCookie(cookieNames.refreshToken, clearOptions);
    response.clearCookie(cookieNames.user, clearOptions);
};
const setProviderTokens = (
    response: express.Response,
    provider: AuthProvider,
    token: { accessToken?: string; expiresIn: number; refreshToken?: string },
    fallbackRefreshToken?: string,
) => {
    if (!token.accessToken) throw new Error("access token이 비어 있어.");
    const cookieNames = authCookieNames[provider];
    const expiresIn = Math.max(1, token.expiresIn);
    const refreshToken = token.refreshToken ?? fallbackRefreshToken;
    if (!refreshToken) throw new Error("refresh token이 비어 있어.");

    response.cookie(cookieNames.accessToken, token.accessToken, cookieOptions(expiresIn * 1000));
    response.cookie(
        cookieNames.expiresAt,
        String(Date.now() + expiresIn * 1000),
        cookieOptions(expiresIn * 1000),
    );
    response.cookie(
        cookieNames.refreshToken,
        refreshToken,
        cookieOptions(30 * 24 * 60 * 60 * 1000),
    );
};
const createLoginSession = (response: express.Response, provider: AuthProvider) => {
    const state = crypto.randomBytes(32).toString("base64url");
    response.cookie("streaming-oauth-state", `${provider}:${state}`, cookieOptions(600000));
    const oauthProvider = getProvider(provider);
    if (!oauthProvider) throw new Error("지원하지 않는 로그인 제공자야.");
    const redirectUri = `${publicApiBaseUrl}/callback/${provider}`;
    return oauthProvider.createAuthorizationUrl({
        clientId: oauthProvider.clientId,
        redirectUri,
        state,
    });
};
const getAccountFromCookies = (
    cookies: Record<string, string> | undefined,
    provider: AuthProvider,
): AuthAccount | null => {
    const cookieNames = authCookieNames[provider];
    if (!cookies?.[cookieNames.user]) return null;
    try {
        const user = JSON.parse(cookies[cookieNames.user] ?? "") as {
            id?: unknown;
            imageUrl?: unknown;
            name?: unknown;
        };
        if (
            typeof user.id !== "string" ||
            typeof user.name !== "string" ||
            typeof user.imageUrl !== "string"
        )
            return null;
        return { id: user.id, imageUrl: user.imageUrl, name: user.name, provider };
    } catch {
        return null;
    }
};
const getUsableAccessToken = async (
    request: express.Request,
    response: express.Response,
    provider: NonNullable<ReturnType<typeof getProvider>>,
) => {
    const cookieNames = authCookieNames[provider.id];
    const accessToken = request.cookies?.[cookieNames.accessToken] as string | undefined;
    const expiresAt = Number(request.cookies?.[cookieNames.expiresAt]);
    if (accessToken && Number.isFinite(expiresAt) && expiresAt > Date.now() + 60_000)
        return accessToken;

    const refreshToken = request.cookies?.[cookieNames.refreshToken] as string | undefined;
    if (!refreshToken || !provider.refreshAccessToken) return null;

    try {
        const clientSecret = await getParameter(provider.clientSecretParameter);
        const token = await provider.refreshAccessToken({
            clientId: provider.clientId,
            clientSecret,
            refreshToken,
            redirectUri: `${publicApiBaseUrl}/callback/${provider.id}`,
        });
        setProviderTokens(response, provider.id, token, refreshToken);
        return token.accessToken ?? null;
    } catch {
        clearProviderCookies(response, provider.id);
        return null;
    }
};

app.use(express.json());
app.use(cookieParser());
app.use((request, response, next) => {
    const origin = request.get("Origin");
    const allowedOrigins = new Set([appOrigin, "http://localhost:5173", "http://127.0.0.1:5173"]);
    if (origin && allowedOrigins.has(origin)) {
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    }
    response.setHeader("Vary", "Origin");
    if (request.method === "OPTIONS") return response.sendStatus(204);
    next();
});

app.get("/health", (_request, response) => {
    response.status(200).json({ status: "ok" });
});

app.post("/sessions/:provider", (request, response, next) => {
    try {
        const provider = getProvider(request.params.provider);
        if (!provider) return response.sendStatus(404);
        return response.json({ authorizationUrl: createLoginSession(response, provider.id) });
    } catch (error) {
        next(error);
    }
});

// 이전 로그인 URL을 사용하는 클라이언트를 위한 호환 경로야.
app.get("/login/:provider", (request, response, next) => {
    try {
        const provider = getProvider(request.params.provider);
        if (!provider) return response.sendStatus(404);
        return response.redirect(createLoginSession(response, provider.id));
    } catch (error) {
        next(error);
    }
});

app.get("/callback/:provider", async (request, response, next) => {
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

const sendAuthenticatedAccounts = async (request: express.Request, response: express.Response) => {
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

app.get("/sessions", (request, response, next) => {
    void sendAuthenticatedAccounts(request, response).catch(next);
});
// 이전 프런트 배포본과의 호환을 위한 읽기 전용 alias야.
app.get("/account", (request, response, next) => {
    void sendAuthenticatedAccounts(request, response).catch(next);
});
app.post("/sessions/:provider/access-token", (request, response, next) => {
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
const logoutAllAccounts = (_request: express.Request, response: express.Response) => {
    authProviders.forEach((provider) => clearProviderCookies(response, provider));
    response.sendStatus(204);
};

app.delete("/sessions", logoutAllAccounts);
// 이전 프런트 배포본과의 호환을 위한 alias야.
app.post("/logout", logoutAllAccounts);
app.delete("/sessions/:provider", (request, response) => {
    const provider = getProvider(request.params.provider);
    if (!provider) return response.sendStatus(404);
    clearProviderCookies(response, provider.id);
    return response.sendStatus(204);
});
app.use(
    (
        error: unknown,
        _request: express.Request,
        response: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(error instanceof Error ? error.message : "OAuth 처리 오류");
        response.sendStatus(500);
    },
);

export const handler = serverless(app, { basePath: "/streaming" });
