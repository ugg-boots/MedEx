import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./styles.scss";
import store from "./store";

const appRouting = (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(appRouting, document.getElementById("root"));
