import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Input, Box, FormControl, Select, Chip } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import Button from "@material-ui/core/Button";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import AddLibraryIcon from "@material-ui/icons/LibraryAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Menu from "@material-ui/core/Menu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MenuItem from "@material-ui/core/MenuItem";
import TeacherCard from "./TeacherCard";
import Toast from "components/Toast.js";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "react-multi-select-component";

import {
	UploadFile,
	GetTeachers,
	GetCourses,
	NewTeacher,
	UpdateTeacher,
} from "../../Server/server";

import { infoColor, hexToRgb } from "assets/jss/material-dashboard-react.js";

const styles = {
	cardCategoryWhite: {
		"&,& a,& a:hover,& a:focus": {
			color: "rgba(255,255,255,.62)",
			margin: "0",
			fontSize: "14px",
			marginTop: "0",
			marginBottom: "0",
		},
		"& a,& a:hover,& a:focus": {
			color: "#FFFFFF",
		},
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
		"& small": {
			color: "#777",
			fontSize: "65%",
			fontWeight: "400",
			lineHeight: "1",
		},
	},
	grid: {
		marginBottom: 100,
	},
	root: {
		maxWidth: 345,
		marginBottom: 20,
	},
	Header: {},
	Menu: {
		position: "absolute",
		right: 10,
		top: 10,
	},
	rootBlank: {
		maxWidth: 345,
		height: 435,
		marginBottom: 20,
		backgroundColor: "rgba(0,0,0,0.04)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		borderRadius: 5,
	},
	rootBlankCard: {
		backgroundColor: "rgba(0,0,0,0.04)",
		padding: 45,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		borderRadius: 30,
	},
	mediaView: {
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		position: "relative",
	},
	Title: {
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		width: "100%",
	},
	TitleName: {
		alignSelf: "center",
		padding: 15,
	},
	media: {
		paddingTop: "56.25%", // 16:9
		width: "60%",
		height: "100%",
		backgroundSize: "contain",
		backgroundRepeat: "no-repeat",
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
	rootAdd: {
		marginTop: "45.5%",
	},
	addCircle: {
		alignItems: "center",
		width: "100%",
	},
	addIcon: {
		fontSize: 65,
		color: "rgba(1,1,1,0.7)",
	},
	addLabel: {
		color: "rgba(1,1,1,0.7)",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		width: "fit-content",
	},
	formControl: {
		minWidth: 12,
	},
	formControlLabel: {
		// marginTop: theme.spacing(1),
	},
	formMulti: {
		// minWidth: 120,
		// maxWidth: 300,
		marginTop: 6,
		width: "100%",
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

export default function TableList() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [teachers, setTeachers] = React.useState([]);
	const [courses, setCourses] = React.useState([]);

	const [editDialog, setEditDialog] = React.useState(false);

	const [fileChosen, setFileChosen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);

	const [state, setState] = React.useState({
		teacher_name: "",
		phone: "",
		email: "",
		qualification: "",
		courses: "",
		start_time: "",
		end_time: "",
		photo: "",
	});

	const [file, setFile] = React.useState("");

	const [selected, setSelected] = React.useState([]);

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

	const handleClickOpen = () => {
		setOpen(true);
		setEditDialog(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleTextChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const handleFileChoose = (event) => {
		setFile(event.target.files[0]);
		setFileChosen(true);
	};

	const handleCoursesChange = (event) => {
		setSelected(event.target.value);
	};

	const { search } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		GetTeachers()
			.then((teacherData) => {
				setTeachers(teacherData.data);
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
	}, [refresh]);

	const filteredTeachers = teachers.filter((teacher) => {
		return (
			teacher.teacher_name
				.toString()
				.toLowerCase()
				.indexOf(search.toString().toLowerCase()) !== -1
		);
	});

	const coursesArray = courses.map((course) => {
		return {
			course_id: course.course_id,
			course_name: course.course_name,
		};
	});

	const newTeacher = () => {
		if (
			state.teacher_name.length === 0 ||
			state.phone.length === 0 ||
			state.email.length === 0 ||
			state.qualification.length === 0 ||
			state.end_time.length === 0 ||
			state.start_time.length === 0 ||
			file.length === 0
		) {
			openErrorToast("All fields are required");
		} else {
			const formData = new FormData();
			formData.append("file", file);
			UploadFile(formData, state.email, "jpg")
				.then((res) => {
					NewTeacher({
						teacher_name: state.teacher_name,
						phone: state.phone,
						email: state.email,
						qualification: state.qualification,
						courses: selected,
						start_time: state.start_time,
						end_time: state.end_time,
						photo: res,
					})
						.then((res) => {
							openSuccessToast("Success.");
							handleClose();
							setRefresh(!refresh);
							setState({
								teacher_name: "",
								phone: "",
								email: "",
								qualification: "",
								courses: "",
								start_time: "",
								end_time: "",
								photo: "",
							});
							setFile("");
							// console.log("New Course", res);
						})
						.catch((err) => {
							openErrorToast(err.message);
						});
				})
				.catch((err) => {
					openErrorToast(err.message);
				});
		}
	};

	return (
		<>
			<GridContainer spacing={3}>
				{filteredTeachers.map((teacher) => (
					<GridItem xs={12} sm={12} md={4} lg={3}>
						<TeacherCard
							teacher={teacher}
							courses={courses}
							handleRefresh={() => {
								setRefresh(!refresh);
							}}
						/>
					</GridItem>
				))}
				<GridItem xs={12} sm={12} md={4} lg={3}>
					<div onClick={handleClickOpen} className={classes.rootBlank}>
						<div className={classes.rootBlankCard}>
							<PersonAddIcon className={classes.addIcon} />
							<Typography className={classes.addLabel}>New Teacher</Typography>
						</div>
					</div>
				</GridItem>
				{/* <GridItem xs={12} sm={12} md={4}>
					<Card className={classes.rootAdd}>
						<Fab color="secondary" aria-label="add" className={classes.margin}>
							<AddIcon />
						</Fab>
					</Card>
				</GridItem> */}
			</GridContainer>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={open}
				onClose={handleClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="form-dialog-title">New Teacher</DialogTitle>
				<DialogContent>
					{/* <Grid item md={6} xs={12}> */}
					<InputLabel>Profile Image</InputLabel>
					<br />
					<Box classes={{ root: classes.uploadDiv }}>
						<Button color="white" variant="contained" component="label">
							<Input
								required
								type="file"
								name="file"
								hidden
								color="white"
								required
								onChange={handleFileChoose}
								// onChange={handleFileChoose}
								// filename={temp}
							/>
						</Button>
					</Box>
					<p style={{ color: "blue", fontSize: 14 }}>{state.photo}</p>
					{/* <InputLabel fullwidth color="primary" shrink>
						<a href={file}>{file}</a>
					</InputLabel> */}
					<TextField
						required
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						type="text"
						name="teacher_name"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.teacher_name,
						}}
						// value={name}
						// onChange={handleNameChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="email"
						label="Email"
						type="text"
						name="email"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.email,
						}}
						// value={name}
						// onChange={handleNameChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="phone"
						label="Phone"
						type="text"
						name="phone"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.phone,
						}}
						// value={name}
						// onChange={handleNameChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="qualification"
						label="Qualification"
						type="text"
						name="qualification"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.qualification,
						}}
						// value={name}
						// onChange={handleNameChange}
					/>{" "}
					<TextField
						required
						autoFocus
						margin="dense"
						id="start_time"
						label="Shift Start Time"
						type="text"
						name="start_time"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.start_time,
						}}
						// value={name}
						// onChange={handleNameChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="end_time"
						label="Shift End Time"
						type="text"
						name="end_time"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.end_time,
						}}
						// value={name}
						// onChange={handleNameChange}
					/>
					{/* <TextField
						autoFocus
						margin="dense"
						id="category"
						label="Description"
						type="text"
						name="description"
						multiline={true}

						// value={category}
						// onChange={handleCategoryChange}
					/> */}
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
							{/* <MenuItem key={"clear"} onClick={hab} value={"clear"}>
								<ClearIcon /> clear selection
							</MenuItem> */}
						</Select>
					</FormControl>
					{/* <MultiSelect
						options={coursesArray}
						value={selected}
						onChange={setSelected}
						labelledBy="Select"
						className={classes.multiSelect}
					/> */}
				</DialogContent>
				<DialogActions>
					{/* <Button
						startIcon={<DeleteIcon />}
						color="secondary"
						style={{ left: 15, position: "absolute" }}
						// onClick={handleDishDelete}
					>
						Delete
					</Button> */}
					{/* {Loading ? (
						<CircularProgress size={24} className={classes.buttonProgress} />
					) : null} */}
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={newTeacher} color="primary">
						Done
					</Button>
				</DialogActions>
			</Dialog>
			<Toast
				open={openToast}
				handleToastClose={handleToastClose}
				severity={severity}
				message={message}
			/>
		</>
		// <GridContainer>
		//   <GridItem xs={12} sm={12} md={12}>
		//     <Card>
		//       <CardHeader color="primary">
		//         <h4 className={classes.cardTitleWhite}>Simple Table</h4>
		//         <p className={classes.cardCategoryWhite}>
		//           Here is a subtitle for this table
		//         </p>
		//       </CardHeader>
		//       <CardBody>
		//         <Table
		//           tableHeaderColor="primary"
		//           tableHead={["Name", "Country", "City", "Salary"]}
		//           tableData={[
		//             ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
		//             ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
		//             ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
		//             ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
		//             ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
		//             ["Mason Porter", "Chile", "Gloucester", "$78,615"]
		//           ]}
		//         />
		//       </CardBody>
		//     </Card>
		//   </GridItem>
		//   <GridItem xs={12} sm={12} md={12}>
		//     <Card plain>
		//       <CardHeader plain color="primary">
		//         <h4 className={classes.cardTitleWhite}>
		//           Table on Plain Background
		//         </h4>
		//         <p className={classes.cardCategoryWhite}>
		//           Here is a subtitle for this table
		//         </p>
		//       </CardHeader>
		//       <CardBody>
		//         <Table
		//           tableHeaderColor="primary"
		//           tableHead={["ID", "Name", "Country", "City", "Salary"]}
		//           tableData={[
		//             ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
		//             ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
		//             ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
		//             [
		//               "4",
		//               "Philip Chaney",
		//               "$38,735",
		//               "Korea, South",
		//               "Overland Park"
		//             ],
		//             [
		//               "5",
		//               "Doris Greene",
		//               "$63,542",
		//               "Malawi",
		//               "Feldkirchen in Kärnten"
		//             ],
		//             ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
		//           ]}
		//         />
		//       </CardBody>
		//     </Card>
		//   </GridItem>
		// </GridContainer>
	);
}
