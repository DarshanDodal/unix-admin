import React, { useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
	makeStyles,
	Snackbar,
} from "@material-ui/core";
import Page from "../../components/Page";
import { Auth } from "aws-amplify";
// import {
// 	CognitoUser,
// 	AuthenticationDetails,
// 	CookieStorage,
// } from "amazon-cognito-identity-js";
// import UserPool from "./cognitoClient";
import MyTheme from "../../themes/theme";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";

import { useDispatch, useSelector } from "react-redux";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "cyan",
		// backgroundColor: theme.palette.background.dark,
		display: "flex",
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	paperContainer: {
		backgroundImage:
			"url('https://www.artheducation.com/admin/blog-images/best-computer-institute-in-okhla.jpg')",

		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	},
	box: {
		backgroundColor: "rgba(0,0,0,0.8)",
		padding: 300,
	},
	Button: {
		backgroundColor: theme.palette.secondary.main,
		color: "rgba(255,255,255,0.8)",
		"&:hover": {
			backgroundColor: "rgba(156, 53, 179, 0.5)",
			boxShadow: "none",
		},
	},
	navLinks: {
		color: MyTheme.palette.primary.main,
	},
	label: {
		color: theme.palette.secondary.main,
		fontSize: 18,
	},
	input: {
		border: `1px solid ${theme.palette.secondary.main} `,
		"&:hover": {
			borderColor: "rgba(156, 53, 179, 0.5)",
			boxShadow: "none",
		},
	},
}));

const ChangePassword = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const [severity, setSeverity] = React.useState("");
	const [message, setMessage] = React.useState("");
	const [submitted, setSubmitted] = React.useState(false);

	const history = useHistory();

	const handleSnackBarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const success = () => {
		// navigate("/app/dashboard", { replace: true });
	};
	// useEffect(() => {
	//   console.log(UserPool.getCurrentUser());
	// });
	return (
		<Paper className={classes.paperContainer} title="Login">
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				justifyContent="center"
				className={classes.box}
			>
				<Container maxWidth="sm">
					<Formik
						initialValues={{
							email: "",
							oldPassword: "",
							newPassword: "",
						}}
						validationSchema={Yup.object().shape({
							email: Yup.string()
								.email("Must be a valid email")
								.max(255)
								.required("Email is required"),
							oldPassword: Yup.string()
								.max(255)
								.required("Old Password is required"),
							newPassword: Yup.string()
								.max(255)
								.required("New Password is required"),
						})}
						onSubmit={(values, action) => {
							Auth.currentAuthenticatedUser().then((user) => {
								Auth.changePassword(
									user,
									values.oldPassword,
									values.newPassword
								)
									.then((user) => {
										console.log(user);
										// dispatch({ type: "AUTH_REFRESH" });
										history.push("/login");
									})
									.catch((err) => {
										console.log(err);
										setSeverity("error");
										setMessage(err.message);
										setOpen(true);
									});
							});
						}}
					>
						{({
							errors,
							handleBlur,
							handleChange,
							handleSubmit,
							isSubmitting,
							touched,
							values,
						}) => (
							<form onSubmit={handleSubmit}>
								<Box mb={3}>
									<Typography color="default" variant="h2">
										Change Password
									</Typography>
								</Box>

								<TextField
									error={Boolean(touched.email && errors.email)}
									fullWidth
									helperText={touched.email && errors.email}
									label="Email Address"
									margin="normal"
									name="email"
									onBlur={handleBlur}
									onChange={handleChange}
									type="email"
									value={values.email}
									variant="outlined"
									InputLabelProps={{
										className: classes.label,
									}}
									InputProps={{
										className: classes.input,
									}}
									inputProps={{
										className: classes.Input,
									}}
								/>
								<TextField
									error={Boolean(touched.oldPassword && errors.oldPassword)}
									fullWidth
									helperText={touched.oldPassword && errors.oldPassword}
									label="Old Password"
									margin="normal"
									name="oldPassword"
									onBlur={handleBlur}
									onChange={handleChange}
									type="password"
									value={values.oldPassword}
									variant="outlined"
									InputLabelProps={{
										className: classes.label,
									}}
									InputProps={{
										className: classes.input,
									}}
								/>
								<TextField
									error={Boolean(touched.newPassword && errors.newPassword)}
									fullWidth
									helperText={touched.newPassword && errors.newPassword}
									label="New Password"
									margin="normal"
									name="newPassword"
									onBlur={handleBlur}
									onChange={handleChange}
									type="password"
									value={values.newPassword}
									variant="outlined"
									InputLabelProps={{
										className: classes.label,
									}}
									InputProps={{
										className: classes.input,
									}}
								/>
								<Box my={2}>
									<Button
										className={classes.Button}
										disabled={isSubmitting || submitted}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
									>
										Sign in now
									</Button>
								</Box>
								{/* <Typography color="textSecondary" variant="body1">
									Don&apos;t have an account?{" "}
									<Link
										className={classes.navLinks}
										component={RouterLink}
										to="/register"
										variant="h6"
									>
										Sign up
									</Link>
								</Typography> */}
							</form>
						)}
					</Formik>
				</Container>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleSnackBarClose}
				>
					<Alert onClose={handleSnackBarClose} severity={severity}>
						{message}
					</Alert>
				</Snackbar>
			</Box>
		</Paper>
	);
};

export default ChangePassword;
