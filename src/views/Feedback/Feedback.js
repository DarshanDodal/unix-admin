import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
	TextField,
	Grid,
	Switch,
	FormControlLabel,
	FormControl,
	Select,
	Input,
	Chip,
	MenuItem,
	Box,
} from "@material-ui/core";
import Table from "components/Table/Table.js";
import Rating from "@material-ui/lab/Rating";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import TablePagination from "@material-ui/core/TablePagination";
import { format, isAfter, isBefore, isEqual, sub, set } from "date-fns";
import { UploadFile, GetFeedback, GetCourses } from "../../Server/server";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";

const styles = {
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0",
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
	},
	label: {
		fontWeight: "bold",
		fontSize: 30,
		marginLeft: 20,
	},
	footer: {
		justifyContent: "flex-end",
	},
	dateGrid: {
		margin: 10,
	},
	tablePagination: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
		padding: 20,
	},
	formMulti: {
		// minWidth: 120,
		// maxWidth: 300,
		height: 50,
		width: "20%",
		marginRight: 10,
		marginLeft: 10,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
		backgroundColor: "#2196f3",
		color: "#fff",
	},
	noLabel: {
		marginTop: 10,
	},
	chiproot: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			margin: 5,
		},
	},
};

const useStyles = makeStyles(styles);

export default function Feedback() {
	const classes = useStyles();
	const [refresh, setRefresh] = React.useState(false);
	const [Feedback, setFeedback] = useState([]);
	const [courses, setCourses] = useState([]);
	const [selected, setSelected] = React.useState([]);
	//switch
	const [switchStateAll, setSwitchStateAll] = React.useState(true);
	const [switchStatePending, setSwitchStatePending] = React.useState(true);

	// Date Picker
	const [selectedDateFromPending, setSelectedDateFromPending] = React.useState(
		sub(new Date(), {
			days: 28,
		})
	);
	const [selectedDateToPending, setSelectedDateToPending] = React.useState(
		set(new Date(), { date: 30 })
	);

	const [selectedDateFromHistory, setSelectedDateFromHistory] = React.useState(
		sub(new Date(), {
			days: 28,
		})
	);
	const [selectedDateToHistory, setSelectedDateToHistory] = React.useState(
		set(new Date(), { date: 30 })
	);

	//Pagination
	const [pageAll, setPageAll] = React.useState(0);
	const [rowsPerPageAll, setRowsPerPageAll] = React.useState(10);

	const [pagePending, setPagePending] = React.useState(0);
	const [rowsPerPagePending, setRowsPerPagePending] = React.useState(10);

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
	// Pagination handles
	const handleChangePageAll = (event, newPage) => {
		setPageAll(newPage);
	};

	const handleChangeRowsPerPageAll = (event) => {
		setRowsPerPageAll(parseInt(event.target.value, 10));
		setPageAll(0);
	};

	const handleChangePagePending = (event, newPage) => {
		setPagePending(newPage);
	};

	const handleChangeRowsPerPagePending = (event) => {
		setRowsPerPagePending(parseInt(event.target.value, 10));
		setPagePending(0);
	};

	// Date Picker handles
	const handleDateChangeFromHistory = (date) => {
		setSelectedDateFromHistory(date);
	};
	const handleDateChangeToHistory = (date) => {
		setSelectedDateToHistory(date);
	};
	const handleDateChangeFromPending = (date) => {
		setSelectedDateFromPending(date);
	};
	const handleDateChangeToPending = (date) => {
		setSelectedDateToPending(date);
	};

	//handle switch state change
	const handleSwitchChangeAll = () => {
		setSwitchStateAll(!switchStateAll);
	};
	const handleSwitchChangePending = () => {
		setSwitchStatePending(!switchStatePending);
		setSelected([]);
	};

	const handleCoursesChange = (event) => {
		setSelected(event.target.value);
	};

	//left here----course wise filter

	const courseWiseFilter = Feedback.filter((feedback) => {
		//find if the specific feedback has the course name that matches the selected courses

		return selected.indexOf(feedback.course_name) !== -1;
	});

	const chooseFilteredOrAll =
		selected.length === 0 ? Feedback : courseWiseFilter;

	// Sort feedbacks by date
	const feedbacksDateWiseSorted = chooseFilteredOrAll.filter((feedback) => {
		return (
			(isAfter(
				new Date(feedback.created_at),
				new Date(selectedDateFromPending)
			) ||
				isEqual(
					new Date(feedback.created_at),
					new Date(selectedDateFromPending)
				)) &&
			isBefore(
				new Date(feedback.created_at),
				new Date(selectedDateToPending)
			) === true
		);
	});

	//select feedbacks based upon switch states
	const DateUnsorted = switchStatePending
		? chooseFilteredOrAll
		: feedbacksDateWiseSorted;

	//Paginate Inquiries

	const FeedbacksPaginated = DateUnsorted.slice(
		pageAll * rowsPerPageAll,
		pageAll * rowsPerPageAll + rowsPerPageAll
	);

	// console.log(DateUnsorted);

	const tabledFeedbacks = FeedbacksPaginated.map((fb) => {
		return [
			fb.student_name,
			fb.course_name,
			<Box
				component="fieldset"
				style={{
					display: "flex",
					alignItms: "center",
				}}
				borderColor="transparent"
			>
				<Rating name="read-only" size="small" value={fb.rating} readOnly />
			</Box>,
			fb.review,
			format(new Date(fb.created_at), "dd MMM yyyy"),
		];
	});

	useEffect(() => {
		GetFeedback()
			.then((res) => {
				console.log(res.data);
				const feedbackDescSorted = res.data
					.slice()
					.sort(
						(a, b) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
					);
				setFeedback(feedbackDescSorted);
			})
			.catch((err) => {
				console.log(err);
			});
		GetCourses()
			.then((res) => {
				// console.log(res.data);
				setCourses(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);
	const PurpleSwitch = withStyles({
		switchBase: {
			color: "#2196f3",
			"&$checked": {
				color: "#2196f3",
			},
			"&$checked + $track": {
				backgroundColor: "#2196f3",
			},
		},
		checked: {},
		track: {
			backgroundColor: "rgba(0,0,0,0.5)",
		},
	})(Switch);

	const coursesArray = courses.map((course) => {
		return {
			course_id: course.course_id,
			course_name: course.course_name,
		};
	});

	// sort feedback by courses

	// sort feedback by date
	return (
		<div>
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
						<CardHeader color="info">
							<h4 className={classes.cardTitleWhite}>Feedback</h4>
						</CardHeader>
						<CardBody>
							<Grid container justify="flex-end">
								<FormControl className={classes.formMulti}>
									<InputLabel color="secondary" id="demo-mutiple-chip-label">
										{switchStatePending ? "All Courses" : "Course wise filter"}
									</InputLabel>
									<Select
										labelId="demo-mutiple-chip-label"
										id="demo-mutiple-chip"
										multiple
										value={selected}
										fullWidth
										onChange={handleCoursesChange}
										input={
											<Input
												variant="filled"
												color="secondary"
												id="select-multiple-chip"
											/>
										}
										renderValue={(select) => {
											return (
												<div className={classes.chips}>
													{select.map((value) => (
														<Chip
															key={value}
															label={value}
															className={classes.chip}
															// clickable
															// color="primary"
															// onDelete={handleChipDelete}
															// deleteIcon={<ClearIcon />}
														/>
													))}
												</div>
											);
										}}
									>
										{coursesArray.map((course) => (
											<MenuItem
												key={course.course_id}
												value={course.course_name}
											>
												{course.course_name}
											</MenuItem>
										))}
										{/* <MenuItem key={"clear"} onClick={hab} value={"clear"}>
								<ClearIcon /> clear selection
							</MenuItem> */}
									</Select>
								</FormControl>
								<KeyboardDatePicker
									disabled={switchStatePending}
									className={classes.dateGrid}
									disableToolbar
									variant="inline"
									format="dd/MM/yyyy"
									margin="normal"
									id="date-picker-inline"
									label="From Date"
									value={selectedDateFromPending}
									onChange={handleDateChangeFromPending}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
								/>
								<KeyboardDatePicker
									disabled={switchStatePending}
									className={classes.dateGrid}
									disableToolbar
									variant="inline"
									margin="normal"
									id="date-picker-dialog"
									label="To Date "
									format="dd/MM/yyyy"
									value={selectedDateToPending}
									onChange={handleDateChangeToPending}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
								/>
							</Grid>
							<Grid container justify="flex-end">
								<FormControlLabel
									control={
										<PurpleSwitch
											checked={switchStatePending}
											onChange={handleSwitchChangePending}
											name="checkedA"
										/>
									}
									label="Show All"
								/>
							</Grid>
							<Table
								tableHeaderColor="info"
								tableHead={[
									"Student Name",
									"Course",
									"Rating",
									"Reviews",
									"Date",
								]}
								tableData={tabledFeedbacks}
							/>
						</CardBody>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, 50, 100]}
							className={classes.pagination}
							component="Table"
							count={10}
							page={pageAll}
							onChangePage={handleChangePageAll}
							rowsPerPage={rowsPerPageAll}
							onChangeRowsPerPage={handleChangeRowsPerPageAll}
						/>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}
