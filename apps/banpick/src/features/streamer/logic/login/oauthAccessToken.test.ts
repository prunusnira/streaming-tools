import { afterEach, describe, expect, it } from "vitest";
import {
    getAccessTokenFromCookie,
    getAccessTokenFromHash,
    saveAccessTokenFromHash,
} from "./oauthAccessToken";

const accessTokenCookieName = "streaming-tools-access-token";

afterEach(() => {
    document.cookie = `${accessTokenCookieName}=; Path=/; Max-Age=0`;
});

describe("oauthAccessToken", () => {
    it("OAuth 콜백 hash에서 access token을 추출한다", () => {
        // Given
        const hash = "#access_token=token-value&scope=chat%3Aread";

        // When
        const accessToken = getAccessTokenFromHash(hash);

        // Then
        expect(accessToken).toBe("token-value");
    });

    it("OAuth 콜백의 access token을 루트 경로 쿠키에 저장하고 읽는다", () => {
        // Given
        const hash = "#access_token=token-value&scope=chat%3Aread";

        // When
        saveAccessTokenFromHash(hash);

        // Then
        expect(getAccessTokenFromCookie()).toBe("token-value");
    });

    it("access token이 없는 hash는 쿠키에 저장하지 않는다", () => {
        // Given
        const hash = "#scope=chat%3Aread";

        // When
        saveAccessTokenFromHash(hash);

        // Then
        expect(getAccessTokenFromCookie()).toBe("");
    });
});
