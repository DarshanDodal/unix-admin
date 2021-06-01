import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import {
	TextField,
	Grid,
	IconButton,
	Tooltip,
	Switch,
	FormControlLabel,
} from "@material-ui/core";
// @material-ui/icons
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
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
import InquiryChart from "./InquiryChart";
import JoiningChart from "./JoiningChart";
import Toast from "components/Toast.js";
import { format } from "date-fns";
import {
	UploadFile,
	GetInquiries,
	GetCourses,
	GetJoinedInquiriesCount,
	UpdateInquiry,
} from "../../Server/server";
import Subscriptions from "./SubscriptionsChart";

import { bugs, website, server } from "variables/general.js";

import {
	dailySalesChart,
	emailsSubscriptionChart,
	completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
	const classes = useStyles();
	const [PendingInquiries, setPendingInquiries] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const [trendingCourse, setTrendingCourse] = React.useState("");

	// Toast States
	const [openToast, SetOpenToast] = React.useState(false);
	const [severity, setSeverity] = React.useState("");
	const [message, setMessage] = React.useState("");

	const handleToastClose = () => {
		SetOpenToast(false);
		setSeverity("");
		setMessage("");
	};

	const openErrorToast = (message) => {
		SetOpenToast(true);
		setSeverity("error");
		setMessage(message);
	};
	const openSuccessToast = (message) => {
		SetOpenToast(true);
		setSeverity("success");
		setMessage(message);
	};

	useEffect(() => {
		GetInquiries()
			.then((res) => {
				// console.log(res.data);
				const pendingInquiries = res.data.filter(
					(inq) =>
						inq.inq_action.inq_status === "Pending" &&
						format(new Date(inq.created_at), "dd MMM yyyy") ===
							format(new Date(), "dd MMM yyyy")
				);

				const pendingDescSorted = pendingInquiries
					.slice()
					.sort(
						(a, b) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
					);
				setPendingInquiries(pendingDescSorted);
			})
			.catch((err) => {
				console.log(err);
			});
		GetCourses()
			.then((res) => {
				const descData = res.data
					.slice()
					.sort(
						(a, b) =>
							new Date(b.subscriptions.value).getTime() -
							new Date(a.subscriptions.value).getTime()
					);
				setTrendingCourse(descData[0].course_name);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);

	const tableDataPending = PendingInquiries.map((inq, i) => {
		const handleUpdateInquiry = (id, status) => {
			UpdateInquiry({
				inquiry_id: id,
				inq_status: status,
			})
				.then((res) => {
					setRefresh(!refresh);
					openSuccessToast("Inquiry Updated");
				})
				.catch((err) => {
					openErrorToast(err.message);
				});
		};
		return [
			inq.name,
			inq.phone_1 + ",  " + inq.phone_2,
			inq.email,
			inq.courses,
			format(new Date(inq.created_at), "dd MMM yyyy"),
			format(new Date(inq.date_of_joining), "dd MMM yyyy"),
			inq.time_slot,
			<>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
						alignItems: "center",
					}}
				>
					<Tooltip title="Joined">
						<IconButton
							onClick={() => {
								handleUpdateInquiry(inq.inquiry_id, "Joined");
							}}
							style={{ color: "#4caf50" }}
							aria-label="Joined"
						>
							<CheckIcon size="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Not Joined">
						<IconButton
							onClick={() => {
								handleUpdateInquiry(inq.inquiry_id, "Not Joined");
							}}
							style={{ color: "#f44336" }}
							aria-label="Not Joined"
						>
							<ClearIcon size="small" />
						</IconButton>
					</Tooltip>
				</div>
			</>,
		];
	});
	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={6} md={4}>
					<InquiryCountCard />
				</GridItem>
				<GridItem xs={12} sm={6} md={4}>
					<InquiryJoiningCard />
				</GridItem>
				{/* <GridItem xs={12} sm={6} md={3}>
					<Card>
						<CardHeader color="success" stats icon>
							<CardIcon color="success">
								<Store />
							</CardIcon>
							<p className={classes.cardCategory}>R</p>
							<h3 className={classes.cardTitle}>$34,245</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<DateRange />
								Last 24 Hours
							</div>
						</CardFooter>
					</Card>
				</GridItem> */}
				<GridItem xs={12} sm={6} md={4}>
					<Card>
						<CardHeader color="warning" stats icon>
							<CardIcon color="warning">
								<Icon>info_outline</Icon>
							</CardIcon>
							<p className={classes.cardCategory}>Trending Course</p>
							<h3 className={classes.cardTitle}>{trendingCourse}</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={classes.stats}>
								<LocalOffer />
								Just Updated
							</div>
						</CardFooter>
					</Card>
				</GridItem>
			</GridContainer>
			<GridContainer>
				<GridItem xs={12} sm={12} md={4}>
					<InquiryChart />
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<JoiningChart />
				</GridItem>
				{/* <GridItem xs={12} sm={12} md={4}>
					<Card chart>
						<CardHeader color="warning">
							<ChartistGraph
								className="ct-chart"
								data={emailsSubscriptionChart.data}
								type="Bar"
								options={emailsSubscriptionChart.options}
								responsiveOptions={emailsSubscriptionChart.responsiveOptions}
								listener={emailsSubscriptionChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<h4 className={classes.cardTitle}>Daily Joinings</h4>
							<p className={classes.cardCategory}>Last Campaign Performance</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> campaign sent 2 days ago
							</div>
						</CardFooter>
					</Card>
				</GridItem> */}
				<GridItem xs={12} sm={12} md={4}>
					<Subscriptions />
					{/* <Card chart>
						<CardHeader color="warning">
							<ChartistGraph
								className="ct-chart"
								data={completedTasksChart.data}
								type="Bar"
								options={completedTasksChart.options}
								listener={completedTasksChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<h4 className={classes.cardTitle}>
								<strong>Tally</strong> subscriptions
							</h4>
							<p className={classes.cardCategory}>Current Performance</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> updated 1 day ago
							</div>
						</CardFooter>
					</Card> */}
				</GridItem>
			</GridContainer>
			<GridContainer>
				{/* <GridItem xs={12} sm={12} md={6}>
					<CustomTabs
						title="Tasks:"
						headerColor="primary"
						tabs={[
							{
								tabName: "Bugs",
								tabIcon: BugReport,
								tabContent: (
									<Tasks
										checkedIndexes={[0, 3]}
										tasksIndexes={[0, 1, 2, 3]}
										tasks={bugs}
									/>
								),
							},
							{
								tabName: "Website",
								tabIcon: Code,
								tabContent: (
									<Tasks
										checkedIndexes={[0]}
										tasksIndexes={[0, 1]}
										tasks={website}
									/>
								),
							},
							{
								tabName: "Server",
								tabIcon: Cloud,
								tabContent: (
									<Tasks
										checkedIndexes={[1]}
										tasksIndexes={[0, 1, 2]}
										tasks={server}
									/>
								),
							},
						]}
					/>
				</GridItem> */}
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Pending Inquiries</h4>
							<p className={classes.cardCategoryWhite}>
								{"Inquiries on " + format(new Date(), "dd MMM yyyy")}
							</p>
						</CardHeader>
						<CardBody>
							<Table
								tableHeaderColor="warning"
								tableHead={[
									"Name",
									"Phone",
									"Email",
									"Course",
									"Inquiry On",
									"Joining Date",
									"Time Slot",
									"Action",
								]}
								tableData={tableDataPending}
							/>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
			<Toast
				open={openToast}
				handleToastClose={handleToastClose}
				severity={severity}
				message={message}
			/>
		</div>
	);
}
