import React, { useEffect, useMemo, useState } from "react";
import {
    getAccessToken,
    getAuthenticatedAccounts,
    type AuthAccount,
    type AuthProvider,
} from "@streaming-tools/auth";
import { StreamerType } from "@banpick/features/streamer/model/user";

const initUser: StreamerType = {
    acctok: "",
    userid: "",
    iconurl: "",
    displayname: "",
    provider: "",
};

type StreamerContextType = {
    data: StreamerType;
    accounts: AuthAccount[] | undefined;
    accessTokens: Partial<Record<AuthProvider, string>>;
};

export const StreamerContext = React.createContext<StreamerContextType>({
    data: initUser,
    accounts: undefined,
    accessTokens: {},
});

type ProviderProps = {
    children: React.ReactNode;
};

export const StreamerProvider = ({ children }: ProviderProps) => {
    const [accounts, setAccounts] = useState<AuthAccount[]>();
    const [accessTokens, setAccessTokens] = useState<Partial<Record<AuthProvider, string>>>({});

    useEffect(() => {
        getAuthenticatedAccounts()
            .then(setAccounts)
            .catch(() => setAccounts([]));
    }, []);

    useEffect(() => {
        if (!accounts?.length) {
            setAccessTokens({});
            return;
        }

        Promise.all(
            accounts.map(async ({ provider }) => {
                try {
                    const session = await getAccessToken(provider);
                    return [provider, session?.accessToken ?? ""] as const;
                } catch {
                    return [provider, ""] as const;
                }
            }),
        )
            .then((entries) => setAccessTokens(Object.fromEntries(entries)));
    }, [accounts]);

    const data = useMemo<StreamerType>(() => {
        const account = accounts?.find((item) => item.provider === "twitch") ?? accounts?.[0];
        return account
            ? {
                  acctok: accessTokens[account.provider] ?? "",
                  displayname: account.name,
                  iconurl: account.imageUrl,
                  provider: account.provider,
                  userid: account.id,
              }
            : initUser;
    }, [accessTokens, accounts]);

    return (
        <StreamerContext.Provider
            value={{
                data,
                accounts,
                accessTokens,
            }}
        >
            {children}
        </StreamerContext.Provider>
    );
};
