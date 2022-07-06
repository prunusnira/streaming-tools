import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    acctok: string;
    loginName: string;
    userId: string;
    clientId: string;
    scope: Array<string>;
    time: number;
};

const initialState: User = {
    acctok: "",
    loginName: "",
    userId: "",
    clientId: "",
    scope: [],
    time: -1,
};

const streamerSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                loginName: action.payload.loginName,
                clientId: action.payload.clientId,
                scope: action.payload.scope,
                userId: action.payload.userId,
            };
        },
        removeUser: () => {
            return {
                ...initialState,
            };
        },
        saveAccessToken: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                acctok: action.payload,
            };
        },
        setTime: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                time: action.payload,
            };
        },
    },
});

export const { saveUser, removeUser, saveAccessToken, setTime } = streamerSlice.actions;
export default streamerSlice.reducer;
