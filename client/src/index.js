import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import promiseMiddleware from "redux-thunk";
import Reducer from "./_reducers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import counterReducer from "./components/features/counter_reducer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = configureStore({reducer: Reducer});//Reducer = 루트리듀서

root.render(
  <Provider store={store}>
    <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
