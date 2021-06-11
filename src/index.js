/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { reducer } from "./reducer/reducer.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { ThemeProvider } from "@material-ui/core";
import theme from "./themes/Maintheme";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// core components
import App from "./App";

import "assets/css/material-dashboard-react.css?v=1.9.0";
Amplify.configure(awsExports);

const hist = createBrowserHistory();

const store = createStore(reducer);
ReactDOM.render(
	<Provider store={store}>
		<Router basename="/" history={hist}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</MuiPickersUtilsProvider>
		</Router>
	</Provider>,
	document.getElementById("root")
);
