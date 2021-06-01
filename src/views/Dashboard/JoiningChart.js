import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {
	UploadFile,
	GetInquiries,
	GetJoinedInquiriesCount,
} from "../../Server/server";

import { bugs, website, server } from "variables/general.js";

import {
	dailySalesChart,
	emailsSubscriptionChart,
	completedTasksChart,
} from "variables/charts.js";
import { format, sub } from "date-fns";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const labels = [
	format(
		sub(new Date(), {
			days: 6,
		}),
		"dd/MM"
	),
	format(
		sub(new Date(), {
			days: 5,
		}),
		"dd/MM"
	),
	format(
		sub(new Date(), {
			days: 4,
		}),
		"dd/MM"
	),
	format(
		sub(new Date(), {
			days: 3,
		}),
		"dd/MM"
	),
	format(
		sub(new Date(), {
			days: 2,
		}),
		"dd/MM"
	),
	format(
		sub(new Date(), {
			days: 1,
		}),
		"dd/MM"
	),
	"Today",
];

export default function JoiningChart() {
	const classes = useStyles();
	const [ChartData, setChartData] = useState({});
	const [Percent, setPercent] = useState(0);

	useEffect(() => {
		GetJoinedInquiriesCount()
			.then((res) => {
				// const series = [31, 45, 3, 118, 150, 17, 50];

				const subToday = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(new Date(), "yyyy-MM-dd")
				);
				const sub1 = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(
							sub(new Date(), {
								days: 1,
							}),
							"yyyy-MM-dd"
						)
				);
				const sub2 = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(
							sub(new Date(), {
								days: 2,
							}),
							"yyyy-MM-dd"
						)
				);
				const sub3 = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(
							sub(new Date(), {
								days: 3,
							}),
							"yyyy-MM-dd"
						)
				);
				const sub4 = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(
							sub(new Date(), {
								days: 4,
							}),
							"yyyy-MM-dd"
						)
				);
				const sub5 = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(
							sub(new Date(), {
								days: 5,
							}),
							"yyyy-MM-dd"
						)
				);
				const sub6 = res.data.filter(
					(inq) =>
						format(new Date(inq.inq_action.ts), "yyyy-MM-dd") ===
						format(
							sub(new Date(), {
								days: 6,
							}),
							"yyyy-MM-dd"
						)
				);

				setPercent(((subToday.length - sub1.length) / sub1.length) * 100);
				console.log({
					labels: labels,
					series: [
						[
							sub6.length,
							sub5.length,
							sub4.length,
							sub3.length,
							sub2.length,
							sub1.length,
							subToday.length,
						],
					],
				});
				setChartData({
					labels: labels,
					series: [
						[
							sub6.length,
							sub5.length,
							sub4.length,
							sub3.length,
							sub2.length,
							sub1.length,
							subToday.length,
						],
					],
				});
				// data: {
				//     labels: ["M", "T", "W", "T", "F", "S", "S"],
				//     series: [[12, 17, 7, 17, 23, 18, 38]],
				// },
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Card chart>
			<CardHeader color="info">
				<ChartistGraph
					className="ct-chart"
					data={ChartData}
					type="Line"
					listener={dailySalesChart().animation}
				/>
			</CardHeader>
			<CardBody>
				<h4 className={classes.cardTitle}>Daily Joinings</h4>
				<p className={classes.cardCategory}>
					<span
						className={Percent < 0 ? classes.errorText : classes.successText}
					>
						{Percent < 0 ? (
							<ArrowDownward className={classes.upArrowCardCategory} />
						) : (
							<ArrowUpward className={classes.upArrowCardCategory} />
						)}
						{isFinite(Math.abs(Percent)) === true
							? Math.abs(Percent) || 0
							: isNaN(Math.abs(Percent)) === true
							? 0
							: 100}
						%
					</span>
					{Percent < 0 ? "decrease" : "increase"} in today's Joinings.
				</p>
			</CardBody>
			<CardFooter chart>
				<div className={classes.stats}>
					<AccessTime /> Just Updated
				</div>
			</CardFooter>
		</Card>
	);
}
