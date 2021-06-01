import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Update from "@material-ui/icons/Update";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import { GetJoinedInquiriesCount } from "../../Server/server";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
	const classes = useStyles();
	const [count, setCount] = useState("");
	useEffect(() => {
		GetJoinedInquiriesCount()
			.then((res) => {
				setCount(res.data.length);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<Card>
			<CardHeader color="info" stats icon>
				<CardIcon color="info">
					<Icon>content_copy</Icon>
				</CardIcon>
				<p className={classes.cardCategory}>Inquiry to Join</p>
				<h3 className={classes.cardTitle}>{count}</h3>
			</CardHeader>
			<CardFooter stats>
				<div className={classes.stats}>
					<Update />
					Just Updated
				</div>
				{/* <div className={classes.stats}>
								<Danger>
									<Warning />
								</Danger>
								<a href="#pablo" onClick={(e) => e.preventDefault()}>
									Get more space
								</a>
							</div> */}
			</CardFooter>
		</Card>
	);
}
