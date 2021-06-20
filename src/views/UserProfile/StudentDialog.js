import React, { useEffect } from "react";
import fs from "fs";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
	FormControl,
	FormLabel,
	MenuItem,
	Select,
	TextField,
	Chip,
	Input,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core";
import Table from "components/Table/Table.js";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
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
import Toast from "components/Toast.js";

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
	UpdateStudentFile,
	GetCourses,
	GetTeachers,
	NewStudent,
	UpdateStudent,
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
	linkP: {
		fontSize: 12,
		color: "#2196f3",
	},
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
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

	const [coursesOld, setCourseOld] = React.useState(props.student.courses);

	const [state, setState] = React.useState({
		first_name: props.student.first_name,
		middle_name: props.student.middle_name,
		last_name: props.student.last_name,
		email: props.student.email,
		phone_1: props.student.phone_1,
		phone_2: props.student.phone_2,
		dob: props.student.dob,
		age: props.student.age,
		gender: props.student.gender,
		caste: props.student.caste,
		father_name: props.student.father_name,
		mother_name: props.student.mother_name,
		guardian_contact: props.student.guardian_contact,
		address: props.student.address,
		aadhar_uuid: props.student.aadhar_uuid,
		completed_qualification: props.student.completed_qualification,
		current_qualification: props.student.current_qualification,
		current_school: props.student.current_school,
		uploads: props.student.uploads,
		courses: props.student.courses,
	});
	let coursesRawArr = {};
	const [coursesInfo, setCoursesInfo] = React.useState(() => {
		props.student.courses.map((course, i) => {
			coursesRawArr = {
				...coursesRawArr,

				[`course_${i + 1}_name`]: course.course_name,
				[`course_${i + 1}_start_date`]: course.course_start_date,
				[`course_${i + 1}_end_date`]: course.course_end_date,
				[`course_${i + 1}_teacher`]: course.course_teacher,
				[`course_${i + 1}_start_time`]: course.course_start_time,
				[`course_${i + 1}_end_time`]: course.course_end_time,
			};
		});
		return coursesRawArr;
	});

	const [selected, setSelected] = React.useState(
		props.student.courses.map((course) => course.course_name)
	);

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
		console.log("Row Clicked:", event);
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
	const handleCoursesInfoChange = (event, i) => {
		// setState({
		// 	...state,
		// 	courses: [
		// 		...state.courses,
		// 		{
		// 			[event.target.name]: event.target.value,
		// 		},
		// 	],
		// });
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

	const updateUpload = (file_name, fileData) => {
		const formData = new FormData();
		formData.append("file", fileData);
		UploadFile(formData, state.email + "_" + file_name, "jpg")
			.then((res) => {
				UpdateStudentFile({
					file_name: file_name,
					file_link: res,
				})
					.then((st) => {
						openSuccessToast("Success.");
					})
					.catch((err) => {
						openErrorToast(err.message);
					});
			})
			.catch((err) => {
				openErrorToast(err.message);
			});
	};

	const updateStudent = () => {
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
		const oldCoursesArray = coursesOld.map((course) => {
			return course.course_name;
		});
		const newCoursesArray = courses_initial(coursesInfo).map((course) => {
			return course.course_name;
		});
		UpdateStudent({
			student_id: props.student.student_id,
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
			courses: courses_initial(coursesInfo),
			oldCourses: oldCoursesArray,
			newCourses: newCoursesArray,
		})
			.then((res) => {
				setDisabled(false);
				props.handleSuccess();
				props.handleClose();
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

				// setFile("");
				// console.log("New Course", res);
			})
			.catch((err) => {
				console.log(err);
				setDisabled(false);
				openErrorToast(err.message);
			});
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
				maxWidth={"lg"}
				onClose={props.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Edit Student Profile"}
				</DialogTitle>
				<DialogContent>
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
											defaultValue: state.first_name,
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
											defaultValue: state.middle_name,
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
											defaultValue: state.last_name,
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
											defaultValue: state.email,
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
											defaultValue: state.phone_1,
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
											defaultValue: state.phone_2,
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
											defaultValue: state.dob,
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
											defaultValue: state.age,
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
											defaultValue: state.gender,
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
											defaultValue: state.caste,
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
											defaultValue: state.father_name,
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
											defaultValue: state.mother_name,
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
											defaultValue: state.guardian_contact,
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
											defaultValue: state.address,
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
											defaultValue: state.aadhar_uuid,
										}}
									/>
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
											defaultValue: state.completed_qualification,
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
											defaultValue: state.current_qualification,
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
											defaultValue: state.current_school,
										}}
									/>
								</GridItem>
							</GridContainer>
							<br></br>
							<br></br>
							<br></br>
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
											<MenuItem
												key={course.course_id}
												value={course.course_name}
											>
												{course.course_name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</GridContainer>
							<br></br>
							<br></br>
							<br></br>
							{selected.map((el, i) => {
								const currentCourse = state.courses[i];
								const currentLength = state.courses.length;
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
													id={`course_name`}
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
														defaultValue:
															i + 1 > currentLength
																? ""
																: currentCourse.course_start_date,
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
														defaultValue:
															i + 1 > currentLength
																? ""
																: currentCourse.course_end_date,
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
														defaultValue:
															i + 1 > currentLength
																? ""
																: currentCourse.course_teacher,
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
														name: `course_${i + 1}_start_time`,
														onChange: handleCoursesInfoChange,
														defaultValue:
															i + 1 > currentLength
																? ""
																: currentCourse.course_start_time,
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
														name: `course_${i + 1}_end_time`,
														onChange: handleCoursesInfoChange,
														defaultValue:
															i + 1 > currentLength
																? ""
																: currentCourse.course_end_time,
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
								<InputLabel className={classes.label}> Uploads</InputLabel>
								<br></br>
								<br></br>
							</GridContainer>
							<TableContainer>
								<TableM className={classes.table} aria-label="simple table">
									<TableBody>
										<TableRow>
											<TableCell
												className={classes.aadharlabel}
												component="th"
												scope="row"
											>
												Aadhar Card <br></br>
												<p className={classes.linkP}>{state.uploads.aadhar}</p>
											</TableCell>
											<TableCell align="left">
												<TextField
													onChange={(e) => {
														updateUpload("aadhar", e.target.files[0]);
													}}
													id="aadhar"
													name="aadhar"
													type="file"
												/>
											</TableCell>
											{/* <TableCell align="center">
												<CircularProgress color={""} size={18} />
											</TableCell> */}
										</TableRow>
										<TableRow>
											<TableCell
												className={classes.aadharlabel}
												component="th"
												scope="row"
											>
												Photo<br></br>
												<p className={classes.linkP}>{state.uploads.photo}</p>
											</TableCell>
											<TableCell align="left">
												<TextField
													id="photo"
													name="photo"
													type="file"
													onChange={(e) => {
														updateUpload("photo", e.target.files[0]);
													}}
												/>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												className={classes.aadharlabel}
												component="th"
												scope="row"
											>
												Qualification Proof<br></br>
												<p className={classes.linkP}>
													{state.uploads.qualification}
												</p>
											</TableCell>
											<TableCell align="left">
												<TextField
													id="qualification"
													name="qualification"
													type="file"
													onChange={(e) => {
														updateUpload("qualification", e.target.files[0]);
													}}
												/>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell
												className={classes.aadharlabel}
												component="th"
												scope="row"
											>
												Signature<br></br>
												<p className={classes.linkP}>
													{state.uploads.signature}
												</p>
											</TableCell>
											<TableCell align="left">
												<TextField
													id="signature"
													name="signature"
													type="file"
													onChange={(e) => {
														updateUpload("signature", e.target.files[0]);
													}}
												/>
											</TableCell>
										</TableRow>
									</TableBody>
								</TableM>
							</TableContainer>
							<br></br>
							<br></br>
							<br></br>
						</CardBody>
					</Card>
				</DialogContent>
				<DialogActions style={{ display: "flex", position: "relative" }}>
					<Button
						onClick={() => {
							props.handleDelete(props.student.student_id);
						}}
						style={{
							display: "flex",
							position: "absolute",
							left: 10,
						}}
						color="primary"
					>
						Delete
					</Button>
					<Button onClick={props.handleClose} color="primary">
						Close
					</Button>
					<Button
						loading={disabled}
						disabled={disabled}
						onClick={updateStudent}
						color="primary"
						autoFocus
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>

			<Toast
				open={openToast}
				handleToastClose={handleToastClose}
				severity={severity}
				message={message}
			/>
		</div>
	);
}
