import {
    createLoginSession,
    getAuthenticatedAccounts,
    logoutAccount,
    logoutAllAccounts,
    type AuthAccount,
} from "@streaming-tools/auth";

export { authCookieNames } from "@streaming-tools/auth";
export type Account = AuthAccount;
export const getAccounts = getAuthenticatedAccounts;
export const logout = logoutAllAccounts;
export const logoutProvider = logoutAccount;
export const startLogin = async (provider: Account["provider"]) => {
    const { authorizationUrl } = await createLoginSession(provider);
    window.location.assign(authorizationUrl);
};
