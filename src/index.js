import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
const options = {
  timeout: 10000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
)