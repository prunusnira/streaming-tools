import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalStyle } from "./commonStyle/global.style";
import IndexContainer from "./modules/indexContainer";
import { store, persistor } from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<IndexContainer />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
