const accessTokenCookieName = "streaming-tools-access-token";

export const getAccessTokenFromHash = (hash: string) => {
    return new URLSearchParams(hash.replace(/^#/, "")).get("access_token") ?? "";
};

export const saveAccessTokenFromHash = (hash: string) => {
    const accessToken = getAccessTokenFromHash(hash);

    if (accessToken === "") {
        return;
    }

    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${accessTokenCookieName}=${encodeURIComponent(accessToken)}; Path=/; SameSite=Lax${secure}`;
};

export const getAccessTokenFromCookie = () => {
    const cookie = document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(`${accessTokenCookieName}=`));

    return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
};
