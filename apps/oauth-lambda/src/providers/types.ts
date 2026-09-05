import type { AuthProvider, AuthUser } from "@streaming-tools/auth";

export type OAuthToken = {
    accessToken?: string;
    expiresIn: number;
    refreshToken?: string;
};

export type OAuthProvider = {
    id: AuthProvider;
    clientId: string;
    clientSecretParameter?: string;
    usesState?: boolean;
    createAuthorizationUrl(input: { clientId: string; redirectUri: string; state: string }): string;
    exchangeAuthorizationCode(input: {
        clientId: string;
        clientSecret: string;
        code: string;
        redirectUri: string;
        state: string;
    }): Promise<OAuthToken>;
    refreshAccessToken?(input: {
        clientId: string;
        clientSecret: string;
        refreshToken: string;
        redirectUri: string;
    }): Promise<OAuthToken>;
    getUser?(input: {
        accessToken: string;
        clientId: string;
        clientSecret: string;
    }): Promise<AuthUser>;
};
