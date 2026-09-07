import crypto from "node:crypto";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { authCookieNames, type AuthAccount, type AuthProvider } from "@streaming-tools/auth";
import type { CookieOptions, Request, Response } from "express";
import { publicApiBaseUrl } from "../config.js";
import { getProvider } from "../providers/index.js";
import type { OAuthProvider } from "../providers/types.js";

const ssm = new SSMClient({});

export const getParameter = async (name: string | undefined) => {
    if (!name) throw new Error("Parameter Store 이름이 설정되지 않았어.");
    const result = await ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true }));
    return result.Parameter?.Value ?? "";
};

export const cookieOptions = (maxAge?: number): CookieOptions => ({
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
});

export const clearProviderCookies = (response: Response, provider: AuthProvider) => {
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

export const setProviderTokens = (
    response: Response,
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

export const createLoginSession = (response: Response, provider: AuthProvider) => {
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

export const getAccountFromCookies = (
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

export const getUsableAccessToken = async (
    request: Request,
    response: Response,
    provider: OAuthProvider,
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
