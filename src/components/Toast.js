import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = (props) => {
	return (
		<Snackbar
			open={props.open}
			autoHideDuration={4000}
			onClose={props.handleToastClose}
		>
			<Alert onClose={props.handleToastClose} severity={props.severity}>
				{props.message}
			</Alert>
		</Snackbar>
	);
};
export default Toast;
