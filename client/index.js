import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from './store'
import App from "./App.jsx";
import "./styles.scss";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['Roboto Mono', 'monospace'].join(','),
	},
});

render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>,

	document.getElementById('root')
);
