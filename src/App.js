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
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { reducer } from "./reducer/reducer.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Amplify, { Auth } from "aws-amplify";
import awsExports from "./aws-exports";
// core components
import Admin from "layouts/Admin.js";
import Login from "./views/Auth/LoginView";
import ChangePassword from "./views/Auth/ChangePassword";

import { ThemeProvider } from "@material-ui/core";
import theme from "./themes/theme";

Amplify.configure(awsExports);

const hist = createBrowserHistory();

// function PrivateRoute({ children, ...rest }) {
// 	const [auth, setAuth] = useState(false);
// 	const history = useHistory();

// 	const isAuthenticated = () => {
// 		setAuth(false);

// 		Auth.currentSession()
// 			.then((response) => {
// 				if (response.isValid()) {
// 					setAuth(true);
// 				} else {
// 					redirectToLogin();
// 				}
// 			})
// 			.catch(() => {
// 				redirectToLogin();
// 			});
// 	};

// 	const redirectToLogin = () => {
// 		history.push("/login");
// 	};

// 	useEffect(() => {
// 		isAuthenticated();
// 	}, []);

// 	return <Route {...rest}>{auth ? children : null}</Route>;
// }

const App = () => {
	const [auth, setAuth] = useState(false);
	const history = useHistory();

	useEffect(() => {
		authenticate();
	}, []);

	const authenticate = () => {
		setAuth(false);

		Auth.currentSession()
			.then((response) => {
				if (response.isValid()) {
					setAuth(true);
				} else {
					setAuth(false);
					history.push("/login");
				}
			})
			.catch(() => {
				setAuth(false);
				history.push("/login");
			});
	};
	return (
		<Switch>
			<Route path="/admin" render={() => (auth ? <Admin /> : null)} />
			{/* <PrivateRoute path="/admin">
						<Admin />
					</PrivateRoute> */}
			<Route path="/login">
				<ThemeProvider theme={theme}>
					<Login />
				</ThemeProvider>
			</Route>
			<Route path="/change-password">
				<ThemeProvider theme={theme}>
					<ChangePassword />
				</ThemeProvider>
			</Route>
			{/* <Route path="/rtl" component={RTL} /> */}
			<Redirect from="/" to="/admin/dashboard" />
		</Switch>
	);
};

export default App;
