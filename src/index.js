import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Provider } from "react-redux";
import "bootstrap/scss/bootstrap.scss";
import Routers from "./routers";
import store from "./store";
import "antd/dist/antd.css";
import { ToastContextProvider } from "./contexts/ToastContext";

ReactDOM.render(
  <ToastContextProvider>
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop>
          <Routers />
        </ScrollToTop>
      </HashRouter>
    </Provider>
  </ToastContextProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
