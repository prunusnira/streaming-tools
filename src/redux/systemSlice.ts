import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SystemType = {
    userDialog: boolean;
};

const initialState: SystemType = {
    userDialog: false,
};

const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setUserDialog: (state, action: PayloadAction<boolean>) => {
            return { ...state, userDialog: action.payload };
        },
    },
});

export const { setUserDialog } = systemSlice.actions;
export default systemSlice.reducer;
