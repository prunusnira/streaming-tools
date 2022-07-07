import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Phase } from "../data/phase";

export type BanPickType = {
    allPick: number;
    turnPick: number;
    turnBan: number;

    isStarted: boolean;
    isEntering: boolean;
    showUsers: boolean;
    isNego: boolean;

    phase: number;
};

const initialState: BanPickType = {
    allPick: 7,
    turnPick: 3,
    turnBan: 1,

    isStarted: false,
    isEntering: false,
    showUsers: true,
    isNego: false,

    phase: Phase.READY,
};

const banpickSlice = createSlice({
    name: "banpick",
    initialState,
    reducers: {
        setAllPickSize: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                allPick: action.payload,
            };
        },
        setTurnPickSize: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                turnPick: action.payload,
            };
        },
        setTurnBanSize: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                turnBan: action.payload,
            };
        },

        setStart: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isStarted: action.payload,
            };
        },
        getTeam: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isEntering: action.payload,
            };
        },
        changePhase: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                phase: action.payload,
            };
        },
        reset: () => {
            return initialState;
        },
        setShowUsers: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                showUsers: action.payload,
            };
        },
    },
});

export const {
    setAllPickSize,
    setTurnBanSize,
    setTurnPickSize,
    setStart,
    getTeam,
    changePhase,
    reset,
    setShowUsers,
} = banpickSlice.actions;
export default banpickSlice.reducer;
