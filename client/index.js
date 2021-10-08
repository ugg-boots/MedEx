import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'

import App from "./App.jsx";
import "./styles.scss";

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
