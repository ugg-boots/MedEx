import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from './store'
import App from "./App.jsx";
import "./styles.scss";
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C9B8',
    },
    secondary: {
      main: '#36008D',
    },
  },
})

render (
  
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
  
);
