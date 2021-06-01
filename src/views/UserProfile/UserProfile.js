import React, { useEffect } from "react";
import fs from "fs";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
	Grid,
	Switch,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	MenuItem,
	Select,
	TextField,
	Chip,
	Input,
	Tooltip,
	IconButton,
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
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableM from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import MultiSelect from "react-multi-select-component";
import Toast from "components/Toast.js";
import TablePagination from "@material-ui/core/TablePagination";

import { useSelector } from "react-redux";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import PostAddIcon from "@material-ui/icons/PostAdd";
import EditIcon from "@material-ui/icons/Edit";
import StudentDialog from "./StudentDialog.js";
import NewCourseDialog from "./NewCourseDialog.js";
import {
	format,
	isAfter,
	isBefore,
	isEqual,
	sub,
	set,
	addMonths,
} from "date-fns";
import {
	UploadFile,
	UploadMultiFile,
	GetCourses,
	GetTeachers,
	NewInquiry,
	UpdateInquiry,
	NewStudent,
	GetStudents,
} from "../../Server/server";
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
	aadhar: {
		display: "flex",
		flexDirection: "column",
	},
	aadharlabel: {
		fontWeight: "bold",
		fontSize: 20,
		marginLeft: 20,
		color: "gray",
	},
	courselabel: {
		fontSize: 20,
		marginLeft: 40,
	},
	footer: {
		justifyContent: "flex-end",
	},
	table: {
		width: 600,
	},
	formMulti: {
		// minWidth: 120,
		// maxWidth: 300,
		marginTop: 6,
		marginLeft: 20,
		width: "20%",
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
	const [gender, setGender] = React.useState("male");
	const [courseQuantity, setCourseQuantity] = React.useState(1);
	const [StartTime, setStartTime] = React.useState(null);
	const [EndTime, setEndTime] = React.useState("");
	const [courses, setCourses] = React.useState([]);
	const [Students, setStudents] = React.useState([]);
	const [Teachers, setTeachers] = React.useState([]);

	const [disabled, setDisabled] = React.useState(false);

	const [Aadhar, setAadhar] = React.useState();
	const [Photo, setPhoto] = React.useState();
	const [Qualification, setQualification] = React.useState();
	const [Signature, setSignature] = React.useState();

	const [dialogDataState, setDialogDataState] = React.useState([]);

	const [state, setState] = React.useState({
		first_name: "",
		middle_name: "",
		last_name: "",
		email: "",
		phone_1: "",
		phone_2: "",
		dob: "",
		age: "",
		gender: "",
		caste: "",
		father_name: "",
		mother_name: "",
		guardian_contact: "",
		address: "",
		aadhar_uuid: "",
		completed_qualification: "",
		current_qualification: "",
		current_school: "",
	});

	const [coursesInfo, setCoursesInfo] = React.useState({
		course_1_name: "",
		course_1_start_date: "",
		course_1_end_date: "",
		course_1_teacher: "",
		course_1_start_time: "",
		course_1_end_time: "",
	});

	const [open, setOpen] = React.useState(false);
	const [openCourse, setOpenCourse] = React.useState(false);

	const [selected, setSelected] = React.useState([]);

	// Toast States
	const [openToast, SetOpenToast] = React.useState(false);
	const [severity, setSeverity] = React.useState("");
	const [message, setMessage] = React.useState("");
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

	// const handleCoursesChange = (event) => {
	// 	setSelected(event.target.value);
	// };

	const handleRefresh = () => {
		setRefresh(!refresh);
	};

	const handleDialogClose = () => {
		setOpen(false);
	};
	const handleDialogOpen = () => {
		setOpen(true);
	};
	const handleCourseDialogClose = () => {
		setOpenCourse(true);
	};
	const handleCourseDialogOpen = () => {
		setOpenCourse(false);
	};

	const handleChange = (event) => {
		setGender(event.target.value);
	};
	const handleCourseChange = (event) => {
		setCourseQuantity(event.target.value);

		var i;
		for (i = 0; i < event.target.value; i++) {
			setCoursesInfo({
				...coursesInfo,
				[`course_${i + 1}_name`]: "",
				[`course_${i + 1}_start_date`]: "",
				[`course_${i + 1}_end_date`]: "",
				[`course_${i + 1}_teacher`]: "",
				[`course_${i + 1}_start_time`]: "",
				[`course_${i + 1}_end_time`]: "",
			});
		}
	};

	const handleStartTimeChange = (event) => {
		// console.log(event);
		setStartTime(event);
	};

	const handleEndTimeChange = (event) => {
		setEndTime(event);
		// console.log(event);
	};

	const handleRowClick = (event) => {
		setDialogDataState(event);
		setOpen(true);
	};

	const handleAadharChange = (event) => {
		setAadhar(event.target.files[0]);
	};

	const handlePhotoChange = (event) => {
		setPhoto(event.target.files[0]);
	};

	const handleQualificationChange = (event) => {
		setQualification(event.target.files[0]);
	};

	const handleSignatureChange = (event) => {
		setSignature(event.target.files[0]);
	};

	const handleStateChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};
	const handleCoursesInfoChange = (event) => {
		setCoursesInfo({ ...coursesInfo, [event.target.name]: event.target.value });
	};
	const handleCoursesChange = (event) => {
		setSelected(event.target.value);

		setCoursesInfo({
			...coursesInfo,
			[`course_${selected.length + 1}_name`]: event.target.value[
				event.target.value.length - 1
			],
		});
	};

	const { search } = useSelector((state) => {
		return state;
	});

	const newStudent = () => {
		setDisabled(true);
		const courses_initial = (coursess) => {
			const arrayedCourses = selected.map((course, i) => {
				return {
					course_name: eval(`coursess.course_${i + 1}_name`),
					course_start_date: eval(`coursess.course_${i + 1}_start_date`),
					course_end_date: eval(`coursess.course_${i + 1}_end_date`),
					course_teacher: eval(`coursess.course_${i + 1}_teacher`),
					course_start_time: eval(`coursess.course_${i + 1}_start_time`),
					course_end_time: eval(`coursess.course_${i + 1}_end_time`),
				};
			});

			return arrayedCourses;
		};
		const formData = new FormData();
		formData.append("file", Aadhar);
		formData.append("file", Photo);
		formData.append("file", Qualification);
		formData.append("file", Signature);
		// var links=

		UploadMultiFile(formData)
			.then((res) => {
				NewStudent({
					first_name: state.first_name,
					middle_name: state.middle_name,
					last_name: state.last_name,
					email: state.email,
					phone_1: state.phone_1,
					phone_2: state.phone_2,
					dob: state.dob,
					age: state.age,
					gender: state.gender,
					caste: state.caste,
					father_name: state.father_name,
					mother_name: state.mother_name,
					guardian_contact: state.guardian_contact,
					address: state.address,
					aadhar_uuid: state.aadhar_uuid,
					completed_qualification: state.completed_qualification,
					current_qualification: state.current_qualification,
					current_school: state.current_school,
					uploads: {
						aadhar: res[0],
						photo: res[1],
						qualification: res[2],
						signature: res[3],
					},
					courses: courses_initial(coursesInfo),
					// { ...coursesInfo, courses_count: selected.length },
				})
					.then((res) => {
						setState({
							first_name: "",
							middle_name: "",
							last_name: "",
							email: "",
							phone_1: "",
							phone_2: "",
							dob: "",
							age: "",
							gender: "",
							caste: "",
							father_name: "",
							mother_name: "",
							guardian_contact: "",
							address: "",
							aadhar_uuid: "",
							completed_qualification: "",
							current_qualification: "",
							current_school: "",
							courses: "",
						});
						openSuccessToast("Success.");
						// handleClose();
						setRefresh(!refresh);
						setDisabled(false);

						// setFile("");
						console.log("New Course", res);
					})
					.catch((err) => {
						openErrorToast(err.message);
						setDisabled(false);
					});
			})
			.catch((err) => {
				console.log(err);
				openErrorToast(err.message);
				setDisabled(false);
			});
		// for (var pair of formData.entries()) {

		// 	console.log(pair[0] + ", " + pair[1]);
		// }

		// NewStudent({
		// 	file: {
		// 		data: formData,
		// 		name: "aadhar",
		// 		type: "jpg",
		// 	},
		// })
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};
	useEffect(() => {
		GetStudents()
			.then((res) => {
				const studentDescSorted = res.data
					.slice()
					.sort(
						(a, b) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
					);
				setStudents(studentDescSorted);
			})
			.catch((err) => {
				console.log(err);
			});
		GetCourses()
			.then((courseData) => {
				setCourses(courseData.data);
			})
			.catch((err) => {
				console.log(err);
			});
		GetTeachers()
			.then((res) => {
				setTeachers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);

	const StudentsDateWiseSorted = Students.filter((inq) => {
		return (
			(isAfter(new Date(inq.created_at), new Date(selectedDateFromPending)) ||
				isEqual(new Date(inq.created_at), new Date(selectedDateFromPending))) &&
			isBefore(new Date(inq.created_at), new Date(selectedDateToPending)) ===
				true
		);
	});

	const bySwitchState = switchStatePending ? Students : StudentsDateWiseSorted;

	const filteredStudents = bySwitchState.filter((student) => {
		return (
			student.first_name
				.toString()
				.toLowerCase()
				.indexOf(search.toString().toLowerCase()) !== -1 ||
			student.last_name
				.toString()
				.toLowerCase()
				.indexOf(search.toString().toLowerCase()) !== -1 ||
			student.user_id
				.toString()
				.toLowerCase()
				.indexOf(search.toString().toLowerCase()) !== -1 ||
			student.email
				.toString()
				.toLowerCase()
				.indexOf(search.toString().toLowerCase()) !== -1
		);
	});

	const StudentsPaginated = filteredStudents.slice(
		pageAll * rowsPerPageAll,
		pageAll * rowsPerPageAll + rowsPerPageAll
	);

	const tableDataStudents = StudentsPaginated.map((inq, i) => {
		const handleUpdateStudents = (id, status) => {
			// UpdateInquiry({
			// 	inquiry_id: id,
			// 	inq_status: status,
			// })
			// 	.then((res) => {
			// 		setRefresh(!refresh);
			// 		openSuccessToast("Inquiry Updated");
			// 	})
			// 	.catch((err) => {
			// 		openErrorToast(err.message);
			// 	});
		};
		return [
			inq.first_name + " " + inq.last_name,
			inq.phone_1 + ",  " + inq.phone_2,
			inq.email,
			inq.user_id,
			inq.password,
			format(new Date(inq.dob), "dd MMM yyyy"),
			format(new Date(inq.created_at), "dd MMM yyyy"),
		];
	});

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

	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<CustomTabs
						title=""
						headerColor="primary"
						tabs={[
							{
								tabName: "Students",
								tabIcon: PersonIcon,
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
											tabName="Students"
											handleClickStudents={handleRowClick}
											tableDataRaw={filteredStudents}
											tableHeaderColor="primary"
											tableHead={[
												"Name",
												"Phone",
												"Email",
												"User ID",
												"Password",
												"Date of Birth",
												"Profile Created On",
											]}
											tableData={tableDataStudents}
										/>
										<div className={classes.tablePagination}>
											<TablePagination
												rowsPerPageOptions={[5, 10, 25, 50, 100]}
												className={classes.pagination}
												component="Table"
												count={filteredStudents.length}
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
								tabName: "Add Students",
								tabIcon: PersonAddIcon,
								tabContent: (
									<>
										<Card>
											<CardBody>
												<GridContainer>
													<InputLabel className={classes.label}>
														{" "}
														Profile Details
													</InputLabel>
												</GridContainer>
												<GridContainer>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="First Name"
															id="first-name"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "first_name",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Middle Name"
															id="middle-name"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "middle_name",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Last Name"
															id="last-name"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "last_name",
																onChange: handleStateChange,
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
																onChange: handleStateChange,
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
																type: "number",
																name: "phone_1",
																onChange: handleStateChange,
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
																type: "number",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
												</GridContainer>
												<GridContainer>
													<GridItem xs={12} sm={12} md={3}>
														<CustomInput
															labelText="Date of Birth"
															id="dob"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																type: "date",
																name: "dob",
																onChange: handleStateChange,
																defaultValue: format(new Date(), "yyyy-MM-dd"),
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={3}>
														<CustomInput
															labelText="Age"
															id="age"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																type: "number",
																name: "age",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={3}>
														<CustomInput
															labelText="Gender"
															id="gender"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "gender",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={3}>
														<CustomInput
															labelText="Caste"
															id="caste"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "caste",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
												</GridContainer>
												<GridContainer>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Father's Name"
															id="fatherName"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "father_name",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Mother's Name"
															id="motherName"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "mother_name",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Parent's Contact"
															id="parentContact"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																type: "number",
																name: "guardian_contact",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
												</GridContainer>
												<GridContainer>
													<GridItem xs={12} sm={12} md={8}>
														<CustomInput
															labelText="Address"
															id="address"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "address",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Aadhar UUID"
															id="aadhar"
															placeholder="optional"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "aadhar_uuid",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
												</GridContainer>
												<GridContainer>
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
												</GridContainer>
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
												<br></br>
												<br></br>
												<br></br>
												<GridContainer>
													<InputLabel className={classes.label}>
														{" "}
														Qualification
													</InputLabel>
												</GridContainer>
												<GridContainer>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Completed Qualification"
															id="completedQualification"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "completed_qualification",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Current Qualification"
															id="currentQualification"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "current_qualification",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Current School/College"
															id="currentSchoolCollege"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																name: "current_school",
																onChange: handleStateChange,
															}}
														/>
													</GridItem>
												</GridContainer>
												<br></br>
												<br></br>
												<br></br>
												<GridContainer>
													<InputLabel className={classes.label}>
														Courses
													</InputLabel>
												</GridContainer>
												<GridContainer>
													<FormControl className={classes.formMulti}>
														<InputLabel id="demo-mutiple-chip-label">
															Courses
														</InputLabel>
														<Select
															required
															labelId="demo-mutiple-chip-label"
															id="demo-mutiple-chip"
															multiple
															value={selected}
															fullWidth
															onChange={handleCoursesChange}
															input={<Input id="select-multiple-chip" />}
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
													{/* <GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="No of courses"
															id="courseNumber"
															formControlProps={{
																fullWidth: true,
															}}
															inputProps={{
																type: "number",
																defaultValue: courseQuantity,
																onChange: handleCourseChange,
															}}
														/>
													</GridItem> */}

													{/* <GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText={`Course ${i}`}
															id={`course${i}`}
															formControlProps={{
																fullWidth: true,
															}}
														/>
													</GridItem> */}
												</GridContainer>
												<br></br>
												<br></br>
												<br></br>
												{/* <CourseInput
													handleCoursesInfoChange={handleCoursesInfoChange}
													selected={selected}
												/> */}
												{selected.map((el, i) => {
													return (
														<>
															<InputLabel
																className={classes.courselabel}
															>{`Course ${i + 1}`}</InputLabel>
															<GridContainer>
																<InputLabel className={classes.courselabel}>
																	{" "}
																</InputLabel>
																<GridItem xs={12} sm={12} md={3}>
																	<CustomInput
																		labelText="Course Name"
																		id={`course_${i + 1}_name`}
																		formControlProps={{
																			fullWidth: true,
																		}}
																		inputProps={{
																			name: `course_${i + 1}_name`,
																			// onChange: handleCoursesInfoChange,
																			value: el,
																		}}
																	/>
																</GridItem>
																<GridItem xs={12} sm={12} md={3}>
																	<CustomInput
																		labelText="Start Date"
																		formControlProps={{
																			fullWidth: true,
																		}}
																		inputProps={{
																			type: "date",
																			name: `course_${i + 1}_start_date`,
																			onChange: handleCoursesInfoChange,
																		}}
																	/>
																</GridItem>
																<GridItem xs={12} sm={12} md={3}>
																	<CustomInput
																		labelText="End Date"
																		formControlProps={{
																			fullWidth: true,
																		}}
																		inputProps={{
																			type: "date",
																			name: `course_${i + 1}_end_date`,
																			onChange: handleCoursesInfoChange,
																		}}
																	/>
																</GridItem>
															</GridContainer>
															<GridContainer>
																<InputLabel className={classes.courselabel}>
																	{" "}
																</InputLabel>
																<GridItem xs={12} sm={12} md={3}>
																	<CustomInput
																		labelText="Course Faculty"
																		formControlProps={{
																			fullWidth: true,
																		}}
																		inputProps={{
																			name: `course_${i + 1}_teacher`,
																			onChange: handleCoursesInfoChange,
																		}}
																	/>
																</GridItem>
																<GridItem xs={12} sm={12} md={3}>
																	<CustomInput
																		labelText="Start Time"
																		formControlProps={{
																			fullWidth: true,
																		}}
																		inputProps={{
																			type: "time",
																			name: "start-time",
																			name: `course_${i + 1}_start_time`,
																			onChange: handleCoursesInfoChange,
																		}}
																	/>
																</GridItem>
																<GridItem xs={12} sm={12} md={3}>
																	<CustomInput
																		labelText="End Time"
																		formControlProps={{
																			fullWidth: true,
																		}}
																		inputProps={{
																			type: "time",
																			name: "end-time",
																			name: `course_${i + 1}_end_time`,
																			onChange: handleCoursesInfoChange,
																		}}
																	/>
																</GridItem>
															</GridContainer>
															<br></br>
															<br></br>
														</>
													);
												})}
												<br></br>
												<br></br>
												<br></br>
												<GridContainer>
													<InputLabel className={classes.label}>
														{" "}
														Uploads
													</InputLabel>
													<br></br>
													<br></br>
												</GridContainer>
												<TableContainer>
													<TableM
														className={classes.table}
														aria-label="simple table"
													>
														<TableBody>
															<TableRow>
																<TableCell
																	className={classes.aadharlabel}
																	component="th"
																	scope="row"
																>
																	Aadhar Card
																</TableCell>
																<TableCell align="left">
																	<TextField
																		onChange={handleAadharChange}
																		id="aadhar"
																		name="aadhar"
																		type="file"
																	/>
																</TableCell>
															</TableRow>
															<TableRow>
																<TableCell
																	className={classes.aadharlabel}
																	component="th"
																	scope="row"
																>
																	Photo
																</TableCell>
																<TableCell align="left">
																	<TextField
																		id="photo"
																		name="photo"
																		type="file"
																		onChange={handlePhotoChange}
																	/>
																</TableCell>
															</TableRow>
															<TableRow>
																<TableCell
																	className={classes.aadharlabel}
																	component="th"
																	scope="row"
																>
																	Qualification Proof
																</TableCell>
																<TableCell align="left">
																	<TextField
																		id="qualification"
																		name="qualification"
																		type="file"
																		onChange={handleQualificationChange}
																	/>
																</TableCell>
															</TableRow>
															<TableRow>
																<TableCell
																	className={classes.aadharlabel}
																	component="th"
																	scope="row"
																>
																	Signature
																</TableCell>
																<TableCell align="left">
																	<TextField
																		id="signature"
																		name="signature"
																		type="file"
																		onChange={handleSignatureChange}
																	/>
																</TableCell>
															</TableRow>
														</TableBody>
													</TableM>
												</TableContainer>
												<br></br>
												<br></br>
												<br></br>
												{/* <GridContainer>
													<InputLabel className={classes.label}>
														{" "}
														User Credentials
													</InputLabel>
												</GridContainer>
												<GridContainer>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="User ID"
															id="user-id"
															formControlProps={{
																fullWidth: true,
															}}
														/>
													</GridItem>
													<GridItem xs={12} sm={12} md={4}>
														<CustomInput
															labelText="Password"
															id="password"
															formControlProps={{
																fullWidth: true,
															}}
														/>
													</GridItem>
												</GridContainer> */}
											</CardBody>
											<CardFooter className={classes.footer}>
												<Button
													loading={disabled}
													disabled={disabled}
													onClick={newStudent}
													color="primary"
												>
													Create Profile
												</Button>
											</CardFooter>
										</Card>
									</>
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
			{open && (
				<StudentDialog
					open={open}
					student={dialogDataState}
					handleClose={handleDialogClose}
					handleRefresh={handleRefresh}
					handleSuccess={() => {
						openSuccessToast("Success.");
						handleRefresh();
					}}
				/>
			)}
			<Toast
				open={openToast}
				handleToastClose={handleToastClose}
				severity={severity}
				message={message}
			/>
		</div>
	);
}
