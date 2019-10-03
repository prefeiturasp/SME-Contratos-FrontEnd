import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "startbootstrap-sb-admin-2/css/sb-admin-2.css";
import store from "./store";
import './assets/scss/style.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
