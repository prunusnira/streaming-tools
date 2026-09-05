export const authApiBaseUrl = "https://api.nira.one/streaming";

export const authProviders = ["twitch", "chzzk", "soop"] as const;
export type AuthProvider = (typeof authProviders)[number];

export const authProviderLabels: Record<AuthProvider, string> = {
    chzzk: "치지직",
    soop: "SOOP",
    twitch: "Twitch",
};

export const authProviderLogoUrls: Record<AuthProvider, string> = {
    chzzk: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Chzzk_Logo.svg",
    soop: "https://images.seeklogo.com/logo-png/67/1/soop-logo-png_seeklogo-676560.png",
    twitch: "https://cdn.simpleicons.org/twitch/9146FF",
};

export type AuthUser = {
    id: string;
    imageUrl: string;
    name: string;
};

export type AuthAccount = AuthUser & {
    provider: AuthProvider;
};

export const authCookieNames = {
    chzzk: {
        accessToken: "chzzk-act",
        expiresAt: "chzzk-exp",
        refreshToken: "chzzk-ret",
        user: "chzzk-user",
    },
    soop: {
        accessToken: "soop-act",
        expiresAt: "soop-exp",
        refreshToken: "soop-ret",
        user: "soop-user",
    },
    twitch: {
        accessToken: "twitch-act",
        expiresAt: "twitch-exp",
        refreshToken: "twitch-ret",
        user: "twitch-user",
    },
} as const satisfies Record<
    AuthProvider,
    Record<"accessToken" | "expiresAt" | "refreshToken" | "user", string>
>;

export const getAuthenticatedAccounts = async (): Promise<AuthAccount[]> => {
    const response = await fetch(`${authApiBaseUrl}/sessions`, { credentials: "include" });
    if (response.status === 401) return [];
    if (!response.ok) throw new Error("계정 상태를 불러오지 못했어.");
    const payload = (await response.json()) as { accounts: AuthAccount[] };
    return payload.accounts;
};

export const logoutAllAccounts = async () => {
    const response = await fetch(`${authApiBaseUrl}/sessions`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) throw new Error("로그아웃에 실패했어.");
};

export const logoutAccount = async (provider: AuthProvider) => {
    const response = await fetch(`${authApiBaseUrl}/sessions/${provider}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) throw new Error("로그아웃에 실패했어.");
};

export const createLoginSession = async (provider: AuthProvider) => {
    const response = await fetch(`${authApiBaseUrl}/sessions/${provider}`, {
        method: "POST",
        credentials: "include",
    });
    if (!response.ok) throw new Error("로그인 요청을 시작하지 못했어.");
    return (await response.json()) as { authorizationUrl: string };
};

export const getAccessToken = async (provider: AuthProvider) => {
    const response = await fetch(`${authApiBaseUrl}/sessions/${provider}/access-token`, {
        method: "POST",
        credentials: "include",
    });
    if (response.status === 401) return null;
    if (!response.ok) throw new Error("서비스 access token을 불러오지 못했어.");
    return (await response.json()) as { accessToken: string; provider: AuthProvider };
};
