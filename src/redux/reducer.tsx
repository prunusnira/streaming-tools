import streamerReducer from "./streamerSlice";
import { combineReducers } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
    user: streamerReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export default combinedReducer;
