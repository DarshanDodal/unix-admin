import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import InputLabel from "@material-ui/core/InputLabel";
import {
	TextField,
	Grid,
	IconButton,
	Tooltip,
	Switch,
	FormControlLabel,
} from "@material-ui/core";
import Table from "components/Table/Table.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import avatar from "assets/img/faces/marc.jpg";
import { bugs, website, server } from "variables/general.js";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Tasks from "components/Tasks/Tasks.js";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import TablePagination from "@material-ui/core/TablePagination";
import Toast from "components/Toast.js";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { format, isAfter, isBefore, isEqual, sub, set } from "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import {
	UploadFile,
	GetInquiries,
	NewInquiry,
	UpdateInquiry,
} from "../../Server/server";

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
	pagination: {},
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
	const classes = useStyles();
	const [refresh, setRefresh] = React.useState(false);

	const [state, setState] = React.useState({
		name: "",
		phone_1: "",
		phone_2: "",
		courses: "",
		email: "",
		date_of_joining: "",
		time_slot: "",
		age: "",
	});

	const [pendingInquiries, setPendingInquiries] = React.useState([]);
	const [allInquiries, setAllInquiries] = React.useState([]);

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

	const handleTextChange = (event) => {
		// console.log(event.target.name, event.target.value);
		setState({ ...state, [event.target.name]: event.target.value });
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
	};

	const PurpleSwitch = withStyles({
		switchBase: {
			color: "#4caf50",
			"&$checked": {
				color: "#4caf50",
			},
			"&$checked + $track": {
				backgroundColor: "#4caf50",
			},
		},
		checked: {},
		track: {
			backgroundColor: "rgba(0,0,0,0.5)",
		},
	})(Switch);

	const newInquiry = () => {
		// console.log(state);
		NewInquiry({
			name: state.name,
			phone_1: state.phone_1,
			phone_2: state.phone_2,
			courses: state.courses,
			email: state.email,
			date_of_joining: state.date_of_joining,
			time_slot: state.time_slot,
			age: state.age,
		})
			.then(() => {
				setState({
					name: "",
					phone_1: "",
					phone_2: "",
					courses: "",
					email: "",
					date_of_joining: "",
					time_slot: "",
					age: "",
				});
				openSuccessToast("Success.");
				setRefresh(!refresh);
			})
			.catch((err) => {
				openErrorToast(err.message);
			});
	};

	useEffect(() => {
		GetInquiries()
			.then((res) => {
				// console.log(res.data);
				const pendingInquiries = res.data.filter(
					(inq) => inq.inq_action.inq_status === "Pending"
				);

				const NonPendingInquiries = res.data.filter(
					(inq) => inq.inq_action.inq_status != "Pending"
				);
				const pendingDescSorted = pendingInquiries
					.slice()
					.sort(
						(a, b) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
					);

				const AllDescSorted = NonPendingInquiries.slice().sort(
					(a, b) =>
						new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
				);

				// const tableAllEnquiries=
				setAllInquiries(AllDescSorted);
				setPendingInquiries(pendingDescSorted);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);

	// Sort pending inquiries by date

	const pendingDateWiseSorted = pendingInquiries.filter((inq) => {
		return (
			(isAfter(new Date(inq.created_at), new Date(selectedDateFromPending)) ||
				isEqual(new Date(inq.created_at), new Date(selectedDateFromPending))) &&
			isBefore(new Date(inq.created_at), new Date(selectedDateToPending)) ===
				true
		);
	});
	// Sort all inquiries by date
	const AllDateWiseSorted = allInquiries.filter((inq) => {
		return (
			(isAfter(new Date(inq.created_at), new Date(selectedDateFromHistory)) ||
				isEqual(new Date(inq.created_at), new Date(selectedDateFromHistory))) &&
			isBefore(new Date(inq.created_at), new Date(selectedDateToHistory)) ===
				true
		);
	});

	//Select sorted or all inquires depending upon switch state
	const AllInquiries = switchStateAll ? allInquiries : AllDateWiseSorted;

	const AllInquiriesPaginated = AllInquiries.slice(
		pageAll * rowsPerPageAll,
		pageAll * rowsPerPageAll + rowsPerPageAll
	);

	//create table data of all date sorted inquires
	const tableDataAll = AllInquiriesPaginated.map((inq, i) => {
		return [
			inq.name,
			inq.phone_1 + ",  " + inq.phone_2,
			inq.email,
			inq.courses,
			format(new Date(inq.created_at), "dd MMM yyyy"),
			format(new Date(inq.date_of_joining), "dd MMM yyyy"),
			inq.time_slot,
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					borderRadius: 5,
					backgroundColor:
						inq.inq_action.inq_status === "Joined" ? "#4caf50" : "#f44336",
					maxHeight: 30,
				}}
			>
				<h6 style={{ color: "white" }}>{inq.inq_action.inq_status}</h6>
			</div>,
		];
	});

	const PendingInquiries = switchStatePending
		? pendingInquiries
		: pendingDateWiseSorted;

	//Paginate Inquiries

	const PendingInquiriesPaginated = PendingInquiries.slice(
		pagePending * rowsPerPagePending,
		pagePending * rowsPerPagePending + rowsPerPagePending
	);

	//create table data of pending date sorted inquires
	const tableDataPending = PendingInquiriesPaginated.map((inq, i) => {
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
				<GridItem xs={12} sm={12} md={12}>
					<CustomTabs
						title=""
						headerColor="success"
						tabs={[
							{
								tabName: "Pending Inquiry",
								tabIcon: LibraryBooksIcon,
								tabContent: (
									<>
										<Grid container justify="flex-end">
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
											tableHeaderColor="success"
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
										<div className={classes.tablePagination}>
											<TablePagination
												rowsPerPageOptions={[5, 10, 25, 50, 100]}
												className={classes.pagination}
												component="Table"
												count={PendingInquiries.length}
												page={pagePending}
												onChangePage={handleChangePagePending}
												rowsPerPage={rowsPerPagePending}
												onChangeRowsPerPage={handleChangeRowsPerPagePending}
											/>
										</div>
									</>
								),
							},
							{
								tabName: "History",
								tabIcon: LibraryAddCheckIcon,
								tabContent: (
									<>
										<Grid container justify="flex-end">
											<KeyboardDatePicker
												disabled={switchStateAll}
												className={classes.dateGrid}
												disableToolbar
												variant="inline"
												format="dd/MM/yyyy"
												margin="normal"
												id="date-picker-inline"
												label="From Date"
												value={selectedDateFromHistory}
												onChange={handleDateChangeFromHistory}
												KeyboardButtonProps={{
													"aria-label": "change date",
												}}
											/>
											<KeyboardDatePicker
												className={classes.dateGrid}
												disabled={switchStateAll}
												disableToolbar
												variant="inline"
												margin="normal"
												id="date-picker-dialog"
												label="To Date "
												format="dd/MM/yyyy"
												value={selectedDateToHistory}
												onChange={handleDateChangeToHistory}
												KeyboardButtonProps={{
													"aria-label": "change date",
												}}
											/>
										</Grid>
										<Grid container justify="flex-end">
											<FormControlLabel
												control={
													<PurpleSwitch
														checked={switchStateAll}
														onChange={handleSwitchChangeAll}
														name="checkedA"
													/>
												}
												label="Show All"
											/>
										</Grid>

										<Table
											tableHeaderColor="success"
											tableHead={[
												"Name",
												"Phone",
												"Email",
												"Course",
												"Inquiry On",
												"Joining Date",
												"Time Slot",
												"Status",
											]}
											tableData={tableDataAll}
										/>
										<div className={classes.tablePagination}>
											<TablePagination
												rowsPerPageOptions={[5, 10, 25, 50, 100]}
												className={classes.pagination}
												component="Table"
												count={AllInquiries.length}
												page={pageAll}
												onChangePage={handleChangePageAll}
												rowsPerPage={rowsPerPageAll}
												onChangeRowsPerPage={handleChangeRowsPerPageAll}
											/>
										</div>
									</>
								),
							},
							{
								tabName: "Create Inquiry",
								tabIcon: LibraryAddIcon,
								tabContent: (
									<Card>
										<CardBody>
											<GridContainer>
												<InputLabel className={classes.label}>
													{" "}
													New Inquiry
												</InputLabel>
											</GridContainer>
											<GridContainer>
												<GridItem xs={12} sm={12} md={4}>
													<CustomInput
														labelText="Name"
														id="name"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "name",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={2}>
													<CustomInput
														labelText="Age"
														id="age"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "age",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={6}>
													<CustomInput
														labelText="Course"
														id="course"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "courses",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
											</GridContainer>

											<GridContainer>
												<GridItem xs={12} sm={12} md={4}>
													<CustomInput
														labelText="Email"
														id="email"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "email",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={4}>
													<CustomInput
														labelText="Phone 1"
														id="phone-1"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "phone_1",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={4}>
													<CustomInput
														labelText="Phone 2"
														id="phone-2"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "phone_2",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
											</GridContainer>
											<GridContainer>
												<GridItem xs={12} sm={12} md={6}>
													<CustomInput
														labelText="Date of Joining"
														id="doj"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															type: "date",
															name: "date_of_joining",
															onChange: handleTextChange,
														}}
													/>
													{/* <TextField
														id="date"
														label="Birthday"
														type="date"
														defaultValue="2017-05-24"
														className={classes.textField}
														InputLabelProps={{
															shrink: true,
														}}
													/> */}
												</GridItem>
												<GridItem xs={12} sm={12} md={6}>
													<CustomInput
														labelText="Time Slot"
														id="time_slot"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															name: "time_slot",
															onChange: handleTextChange,
														}}
													/>
												</GridItem>
											</GridContainer>
											{/* <GridContainer> */}
											{/* <GridItem xs={12} sm={12} md={5}>
												 <CustomInput
														labelText="Company (disabled)"
														id="company-disabled"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															disabled: true,
														}}
													/> 
												</GridItem> */}
											{/* <GridItem xs={12} sm={12} md={6}>
													<CustomInput
														labelText="User ID"
														id="user-id"
														formControlProps={{
															fullWidth: true,
														}}
													/>
												</GridItem>
												<GridItem xs={12} sm={12} md={6}>
													<CustomInput
														labelText="Password"
														id="password"
														formControlProps={{
															fullWidth: true,
														}}
													/>
												</GridItem> */}
											{/* </GridContainer> */}
											<GridContainer>
												<GridItem xs={12} sm={12} md={12}>
													{/* <CustomInput
														labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
														id="about-me"
														formControlProps={{
															fullWidth: true,
														}}
														inputProps={{
															multiline: true,
															rows: 5,
														}}
													/> */}
												</GridItem>
											</GridContainer>
										</CardBody>
										<CardFooter className={classes.footer}>
											<Button onClick={newInquiry} color="success">
												Create Inquiry
											</Button>
										</CardFooter>
									</Card>
								),
							},
						]}
					/>
				</GridItem>
				{/* <GridItem xs={12} sm={12} md={8}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Edit Profile</h4>
							<p className={classes.cardCategoryWhite}>Complete your profile</p>
						</CardHeader>
						<CardBody>
							<GridContainer>
								<GridItem xs={12} sm={12} md={5}>
									<CustomInput
										labelText="Company (disabled)"
										id="company-disabled"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											disabled: true,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={3}>
									<CustomInput
										labelText="Username"
										id="username"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Email address"
										id="email-address"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="First Name"
										id="first-name"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<CustomInput
										labelText="Last Name"
										id="last-name"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="City"
										id="city"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Country"
										id="country"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<CustomInput
										labelText="Postal Code"
										id="postal-code"
										formControlProps={{
											fullWidth: true,
										}}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
									<CustomInput
										labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
										id="about-me"
										formControlProps={{
											fullWidth: true,
										}}
										inputProps={{
											multiline: true,
											rows: 5,
										}}
									/>
								</GridItem>
							</GridContainer>
						</CardBody>
						<CardFooter>
							<Button color="primary">Update Profile</Button>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<Card profile>
						<CardAvatar profile>
							<a href="#pablo" onClick={(e) => e.preventDefault()}>
								<img src={avatar} alt="..." />
							</a>
						</CardAvatar>
						<CardBody profile>
							<h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
							<h4 className={classes.cardTitle}>Alec Thompson</h4>
							<p className={classes.description}>
								Don{"'"}t be scared of the truth because we need to restart the
								human foundation in truth And I love you like Kanye loves Kanye
								I love Rick Owens’ bed design but the back is...
							</p>
							<Button color="primary" round>
								Follow
							</Button>
						</CardBody>
					</Card>
				</GridItem> */}
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
