import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Input, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Toast from "components/Toast.js";
import { useSelector } from "react-redux";

import { infoColor, hexToRgb } from "assets/jss/material-dashboard-react.js";
import {
	UploadFile,
	GetCourses,
	NewCourse,
	UpdateCourse,
} from "../../Server/server";

import fs from "fs";

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
	rootBlank: {
		maxWidth: 345,
		height: 428,
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
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
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
};

const useStyles = makeStyles(styles);

export default function TableList() {
	const classes = useStyles();
	const [editOpen, setEditOpen] = React.useState(false);
	const [courses, setCourses] = React.useState([]);
	const [fileChosen, setFileChosen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);

	const [state, setState] = React.useState({
		courseName: "",
		price: "",
		description: "",
	});

	const [file, setFile] = React.useState("");

	// Toast States
	const [openToast, SetOpenToast] = React.useState(false);
	const [severity, setSeverity] = React.useState("");
	const [message, setMessage] = React.useState("");

	const handleToastClose = () => {
		SetOpenToast(false);
		setSeverity("");
		setMessage("");
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};
	//Menu Handles

	const handleTextChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const handleFileChoose = (event) => {
		setFile(event.target.files[0]);
		setFileChosen(true);
	};

	const { search } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		GetCourses()
			.then((coursesData) => {
				setCourses(coursesData.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);
	const filteredCourses = courses.filter((course) => {
		return (
			course.course_name
				.toString()
				.toLowerCase()
				.indexOf(search.toString().toLowerCase()) !== -1
		);
	});

	const newCourse = () => {
		if (
			state.courseName.length === 0 ||
			state.description.length === 0 ||
			state.price.length === 0 ||
			file.length === 0
		) {
			openErrorToast("All field are required");
		} else {
			const formData = new FormData();
			formData.append("file", file);
			UploadFile(formData, state.courseName, "jpg")
				.then((res) => {
					NewCourse({
						course_name: state.courseName,
						description: state.description,
						price: state.price,
						photo: res,
					})
						.then((res) => {
							openSuccessToast("Success.");
							handleClose();
							setRefresh(!refresh);
							// console.log("New Course", res);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => console.log(err));
		}
	};
	const updateCourse = () => {
		UpdateCourse()
			.then(() => {})
			.catch((err) => {});
	};

	return (
		<>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={editOpen}
				onClose={handleEditClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="form-dialog-title">{"Edit Course"}</DialogTitle>
				<DialogContent>
					{/* <Grid item md={6} xs={12}> */}

					{/* <InputLabel fullwidth color="primary" shrink>
						<a href={file}>{file}</a>
					</InputLabel> */}
					<InputLabel>Course Cover Image</InputLabel>
					<br />
					<Box classes={{ root: classes.uploadDiv }}>
						<Button color="white" variant="contained" component="label">
							<Input
								type="file"
								name="file"
								hidden
								color="white"
								required
								onChange={handleFileChoose}
								// filename={temp}
							/>
						</Button>
					</Box>
					<TextField
						required
						autoFocus
						margin="dense"
						id="name"
						label="Course Name"
						type="text"
						name="courseName"
						fullWidth
						// value={name}
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.description,
						}}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="price"
						label="Price"
						type="number"
						name="price"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.description,
						}}
						// value={price}
						// onChange={handlePriceChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						id="category"
						label="Description"
						type="text"
						name="description"
						multiline={true}
						fullWidth
						inputProps={{
							maxLength: 500,
							defaultValue: state.description,
						}}
						onChange={handleTextChange}
						// value={category}
						// onChange={handleCategoryChange}
					/>
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
					<Button onClick={handleEditClose} color="primary">
						Cancel
					</Button>
					<Button onClick={updateCourse} color="primary">
						{"Create"}
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
	);
}
