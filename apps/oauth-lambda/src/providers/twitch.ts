import type { OAuthProvider } from "./types.js";

const authorizationUrl = "https://id.twitch.tv/oauth2/authorize";
const tokenUrl = "https://id.twitch.tv/oauth2/token";
const clientId = "jfuw48b48to8ortsd5dyoi08oyp89x";

export const twitchProvider: OAuthProvider = {
    id: "twitch",
    clientId,
    clientSecretParameter: process.env.TWITCH_CLIENT_SECRET_PARAMETER,
    createAuthorizationUrl({ clientId, redirectUri, state }) {
        const parameters = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: "code",
            scope: "chat:read user:read:chat user:read:email",
            state,
        });

        return `${authorizationUrl}?${parameters}`;
    },
    async exchangeAuthorizationCode({ clientId, clientSecret, code, redirectUri }) {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
            }),
        });

        if (!response.ok) throw new Error("Twitch token 교환에 실패했어.");

        const token = (await response.json()) as {
            access_token?: string;
            expires_in?: number;
            refresh_token?: string;
        };
        return {
            accessToken: token.access_token,
            expiresIn: Number(token.expires_in ?? 86400),
            refreshToken: token.refresh_token,
        };
    },
    async refreshAccessToken({ clientId, clientSecret, refreshToken }) {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        });
        if (!response.ok) throw new Error("Twitch token 갱신에 실패했어.");

        const token = (await response.json()) as {
            access_token?: string;
            expires_in?: number;
            refresh_token?: string;
        };
        return {
            accessToken: token.access_token,
            expiresIn: Number(token.expires_in ?? 86400),
            refreshToken: token.refresh_token,
        };
    },
    async getUser({ accessToken, clientId }) {
        const response = await fetch("https://api.twitch.tv/helix/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": clientId,
            },
        });
        if (!response.ok) throw new Error("Twitch 사용자 정보 조회에 실패했어.");
        const payload = (await response.json()) as {
            data?: Array<{
                display_name?: string;
                id?: string;
                login?: string;
                profile_image_url?: string;
            }>;
        };
        const user = payload.data?.[0];
        if (!user?.login || !user.display_name || !user.profile_image_url)
            throw new Error("Twitch 사용자 정보가 비어 있어.");
        return { id: user.login, imageUrl: user.profile_image_url, name: user.display_name };
    },
};
