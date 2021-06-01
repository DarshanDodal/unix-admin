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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
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
import Toast from "components/Toast.js";

import { useSelector } from "react-redux";
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

export default function NewCourseDialog(props) {
	const classes = useStyles();
	const [refresh, setRefresh] = React.useState(false);
	const [courses, setCourses] = React.useState([]);
	const [Students, setStudents] = React.useState([]);
	const [Teachers, setTeachers] = React.useState([]);

	const [Aadhar, setAadhar] = React.useState();
	const [Photo, setPhoto] = React.useState();
	const [Qualification, setQualification] = React.useState();
	const [Signature, setSignature] = React.useState();

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

	const handleDialogClose = () => {
		setOpen(false);
	};
	const handleDialogOpen = () => {
		setOpen(true);
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

	const updateStudent = () => {
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
					courses: { ...coursesInfo, courses_count: selected.length },
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

						// setFile("");
						console.log("New Course", res);
					})
					.catch((err) => {
						openErrorToast(err.message);
					});
			})
			.catch((err) => {
				console.log(err);
				openErrorToast(err.message);
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

	const coursesArray = courses.map((course) => {
		return {
			course_id: course.course_id,
			course_name: course.course_name,
		};
	});

	return (
		<div>
			<Dialog
				open={props.open}
				fullWidth={true}
				maxWidth="lg"
				onClose={props.handleDialogClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="alert-dialog-title">Add Course </DialogTitle>
				<DialogContent>
					<GridContainer>
						<InputLabel className={classes.label}>Courses</InputLabel>
					</GridContainer>
					<GridContainer>
						<FormControl className={classes.formMulti}>
							<InputLabel id="demo-mutiple-chip-label">Courses</InputLabel>
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
									<MenuItem key={course.course_id} value={course.course_name}>
										{course.course_name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</GridContainer>
					<br></br>
					{selected.map((el, i) => {
						return (
							<>
								<InputLabel className={classes.courselabel}>{`Course ${
									i + 1
								}`}</InputLabel>
								<GridContainer>
									<InputLabel className={classes.courselabel}> </InputLabel>
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
												defaultValue: format(new Date(), "yyyy-MM-dd"),
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
												defaultValue: format(
													addMonths(new Date(), 3),
													"yyyy-MM-dd"
												),
											}}
										/>
									</GridItem>
								</GridContainer>
								<GridContainer>
									<InputLabel className={classes.courselabel}> </InputLabel>
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
												defaultValue: "08:00",
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
												defaultValue: "09:00",
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
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleDialogClose} color="primary">
						Disagree
					</Button>
					<Button onClick={updateStudent} color="primary" autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>

			<br></br>
			<br></br>

			<Toast
				open={openToast}
				handleToastClose={handleToastClose}
				severity={severity}
				message={message}
			/>
		</div>
	);
}
