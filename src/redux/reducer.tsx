import streamerReducer from "./streamerSlice";
import banpickReducer from "./banpickSlice";
import systemReducer from "./systemSlice";
import { combineReducers } from "@reduxjs/toolkit";

const combinedReducer = combineReducers({
    user: streamerReducer,
    banpick: banpickReducer,
    system: systemReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export default combinedReducer;
