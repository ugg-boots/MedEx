import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./styles.scss";
import D3_App from './react-d3/src/D3_App.js';
import store from './store';
import { Provider } from 'react-redux';//import Provider to wrap APP to pass in state

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
