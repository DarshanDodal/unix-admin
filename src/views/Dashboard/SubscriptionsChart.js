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
import InquiryCountCard from "./InquiryCountCard";
import InquiryJoiningCard from "./InquiryJoiningCard";
import {
	UploadFile,
	GetInquiries,
	GetCourses,
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

export default function Dashboard() {
	const classes = useStyles();
	const [ChartData, setChartData] = useState({});
	const [Percent, setPercent] = useState(0);

	useEffect(() => {
		GetCourses()
			.then((res) => {
				// const series = [31, 45, 3, 118, 150, 17, 50];
				const descData = res.data
					.slice()
					.sort(
						(a, b) =>
							new Date(b.subscriptions.value).getTime() -
							new Date(a.subscriptions.value).getTime()
					);
				const topFiveCourses = descData.filter((course, index) => {
					return index < 5;
				});
				var getInitials = function (string) {
					var names = string.split(" "),
						initials = names[0].substring(0, 1).toUpperCase();

					if (names.length > 1) {
						initials += names[names.length - 1].substring(0, 1).toUpperCase();
					}
					return initials;
				};
				const TopFiveNames = topFiveCourses.map((course) => {
					return getInitials(course.course_name);
				});
				const TopFiveSubscriptions = topFiveCourses.map((course) => {
					return course.subscriptions.value;
				});
				setPercent(TopFiveSubscriptions[0]);
				setChartData({ labels: TopFiveNames, series: [TopFiveSubscriptions] });

				// setPercent(((sub1.length - sub1.length) / sub1.length) * 100);

				// setChartData({
				// 	labels: labels,
				// 	series: [
				// 		[
				// 			sub6.length,
				// 			sub5.length,
				// 			sub4.length,
				// 			sub3.length,
				// 			sub2.length,
				// 			sub1.length,
				// 			sub1.length,
				// 		],
				// 	],
				// });
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
			<CardHeader color="warning">
				<ChartistGraph
					className="ct-chart"
					data={ChartData}
					options={{ high: Percent + 2 }}
					type="Bar"
					listener={completedTasksChart.animation}
				/>
			</CardHeader>
			<CardBody>
				<h4 className={classes.cardTitle}>Top 5 Courses</h4>
				<p className={classes.cardCategory}>Current Subscriptions</p>
			</CardBody>
			<CardFooter chart>
				<div className={classes.stats}>
					<AccessTime /> Just Updated
				</div>
			</CardFooter>
		</Card>
	);
}
