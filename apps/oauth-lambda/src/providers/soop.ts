import type { OAuthProvider } from "./types.js";

const authorizationUrl = "https://openapi.sooplive.com/auth/code";
const tokenUrl = "https://openapi.sooplive.com/auth/token";
const stationInfoUrl = "https://openapi.sooplive.com/user/stationinfo";
const clientId = "5be9d42ea5924e66ae020a0427346121";

export const soopProvider: OAuthProvider = {
    id: "soop",
    clientId,
    clientSecretParameter: process.env.SOOP_CLIENT_SECRET_PARAMETER,
    usesState: false,
    createAuthorizationUrl({ clientId }) {
        return `${authorizationUrl}?${new URLSearchParams({ client_id: clientId })}`;
    },
    async exchangeAuthorizationCode({ clientId, clientSecret, code, redirectUri }) {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientId,
                client_secret: clientSecret,
                code,
                redirect_uri: redirectUri,
            }),
        });

        if (!response.ok) throw new Error("SOOP token 교환에 실패했어.");

        const token = (await response.json()) as {
            access_token?: string;
            expires_in?: number;
            refresh_token?: string;
        };
        return {
            accessToken: token.access_token,
            expiresIn: Number(token.expires_in ?? 28800),
            refreshToken: token.refresh_token,
        };
    },
    async refreshAccessToken({ clientId, clientSecret, refreshToken }) {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
            }),
        });
        if (!response.ok) throw new Error("SOOP token 갱신에 실패했어.");

        const token = (await response.json()) as {
            access_token?: string;
            expires_in?: number;
            refresh_token?: string;
        };
        return {
            accessToken: token.access_token,
            expiresIn: Number(token.expires_in ?? 28800),
            refreshToken: token.refresh_token,
        };
    },
    async getUser({ accessToken }) {
        const response = await fetch(stationInfoUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ access_token: accessToken }),
        });
        if (!response.ok) throw new Error("SOOP 방송국 정보 조회에 실패했어.");

        const payload = (await response.json()) as {
            data?: {
                profile_image?: string;
                station_name?: string;
                user_nick?: string;
            };
            result?: number;
        };
        const station = payload.data;
        if (payload.result !== 1 || !station?.user_nick)
            throw new Error("SOOP 사용자 정보가 비어 있어.");

        return {
            // 공식 응답에는 SOOP 사용자 ID가 없으므로 빈 값으로 유지해.
            id: "",
            imageUrl: station.profile_image ?? "",
            name: station.user_nick,
        };
    },
};
