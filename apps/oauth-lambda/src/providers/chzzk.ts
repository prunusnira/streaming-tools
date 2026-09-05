import type { OAuthProvider } from "./types.js";

const authorizationUrl = "https://chzzk.naver.com/account-interlock";
const apiBaseUrl = "https://openapi.chzzk.naver.com";
const clientId = "86f7360a-8a8d-4c8a-ac2e-d1be5576ca5b";

export const chzzkProvider: OAuthProvider = {
    id: "chzzk",
    clientId,
    clientSecretParameter: process.env.CHZZK_CLIENT_SECRET_PARAMETER,
    createAuthorizationUrl({ clientId, redirectUri, state }) {
        const parameters = new URLSearchParams({ clientId, redirectUri, state });

        return `${authorizationUrl}?${parameters}`;
    },
    async exchangeAuthorizationCode({ clientId, clientSecret, code, state }) {
        const response = await fetch(`${apiBaseUrl}/auth/v1/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId,
                clientSecret,
                code,
                grantType: "authorization_code",
                state,
            }),
        });

        if (!response.ok) {
            const error = (await response.json().catch(() => null)) as {
                code?: unknown;
                errorCode?: unknown;
            } | null;
            const errorCode =
                typeof error?.errorCode === "string"
                    ? error.errorCode
                    : typeof error?.code === "string"
                      ? error.code
                      : undefined;
            console.error("치지직 token 교환 실패", { status: response.status, errorCode });
            throw new Error("치지직 token 교환에 실패했어.");
        }

        const payload = (await response.json()) as {
            accessToken?: string;
            content?: {
                accessToken?: string;
                expiresIn?: number;
                refreshToken?: string;
            };
            expiresIn?: number;
            refreshToken?: string;
        };
        const token = payload.content ?? payload;
        return {
            accessToken: token.accessToken,
            expiresIn: Number(token.expiresIn ?? 86400),
            refreshToken: token.refreshToken,
        };
    },
    async refreshAccessToken({ clientId, clientSecret, refreshToken }) {
        const response = await fetch(`${apiBaseUrl}/auth/v1/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId,
                clientSecret,
                grantType: "refresh_token",
                refreshToken,
            }),
        });
        if (!response.ok) throw new Error("치지직 token 갱신에 실패했어.");

        const payload = (await response.json()) as {
            accessToken?: string;
            content?: {
                accessToken?: string;
                expiresIn?: number;
                refreshToken?: string;
            };
            expiresIn?: number;
            refreshToken?: string;
        };
        const token = payload.content ?? payload;
        return {
            accessToken: token.accessToken,
            expiresIn: Number(token.expiresIn ?? 86400),
            refreshToken: token.refreshToken,
        };
    },
    async getUser({ accessToken, clientId, clientSecret }) {
        const response = await fetch(`${apiBaseUrl}/open/v1/users/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) {
            console.error("치지직 사용자 정보 조회 실패", { status: response.status });
            throw new Error("치지직 사용자 정보 조회에 실패했어.");
        }
        const payload = (await response.json()) as {
            content?: { channelId?: string; channelName?: string };
        };
        const user = payload.content;
        if (!user?.channelId || !user.channelName)
            throw new Error("치지직 사용자 정보가 비어 있어.");

        const channelUrl = new URL(`${apiBaseUrl}/open/v1/channels`);
        channelUrl.searchParams.append("channelIds", user.channelId);
        const channelResponse = await fetch(channelUrl, {
            headers: {
                "Client-Id": clientId,
                "Client-Secret": clientSecret,
            },
        });
        const channelPayload = channelResponse.ok
            ? ((await channelResponse.json()) as {
                  content?: { data?: Array<{ channelImageUrl?: string }> };
              })
            : undefined;
        return {
            id: "",
            imageUrl: channelPayload?.content?.data?.[0]?.channelImageUrl ?? "",
            name: user.channelName,
        };
    },
};
