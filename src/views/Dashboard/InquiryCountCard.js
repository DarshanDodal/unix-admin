import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import { GetInquiries } from "../../Server/server";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
	const classes = useStyles();
	const [count, setCount] = useState("");
	useEffect(() => {
		GetInquiries()
			.then((res) => {
				setCount(res.data.length);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<Card>
			<CardHeader color="success" stats icon>
				<CardIcon color="success">
					<Accessibility />
				</CardIcon>
				<p className={classes.cardCategory}>Inquiry</p>
				<h3 className={classes.cardTitle}>{count}</h3>
			</CardHeader>
			<CardFooter stats>
				<div className={classes.stats}>
					<Update />
					Just Updated
				</div>
			</CardFooter>
		</Card>
	);
}
