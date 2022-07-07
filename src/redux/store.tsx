import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import combinedReducer from "./reducer";

const persistConfig = {
    key: "root",
    storage,
};

const enhancedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    reducer: enhancedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export default { store, persistor };
