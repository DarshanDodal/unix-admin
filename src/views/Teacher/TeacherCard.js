import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {
	Input,
	Box,
	FormControl,
	Chip,
	Select,
	DialogContentText,
} from "@material-ui/core";
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
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ClearIcon from "@material-ui/icons/Clear";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "react-multi-select-component";
import Toast from "components/Toast.js";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

import {
	UploadFile,
	UpdateTeacher,
	UploadDeleteFile,
	DeleteTeacher,
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
		height: 360,
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
		paddingTop: 20,
	},
	Title: {
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		width: "100%",
	},
	TitleName: {
		alignSelf: "center",
		padding: 5,
	},
	TitleIcon: {
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		width: "100%",
	},
	TitlePhone: {
		alignSelf: "center",
		padding: 6,
	},
	media: {
		paddingTop: "66.25%", // 16:9
		width: "60%",
		height: "100%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		borderRadius: 5,
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
	cActions: {
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	timing: {
		display: "flex",
		flexDirection: "row",
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
		backgroundColor: "#4caf50",
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

const options = [
	{ label: "Grapes 🍇", value: "grapes" },
	{ label: "Mango 🥭", value: "mango" },
	{ label: "Strawberry 🍓", value: "strawberry", disabled: true },
	{ label: "Watermelon 🍉", value: "watermelon" },
	{ label: "Pear 🍐", value: "pear" },
	{ label: "Apple 🍎", value: "apple" },
	{ label: "Tangerine 🍊", value: "tangerine" },
	{ label: "Pineapple 🍍", value: "pineapple" },
	{ label: "Peach 🍑", value: "peach" },
];

export default function TeacherCard({ teacher, courses, handleRefresh }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [deleteOpen, setDeleteOpen] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [fileChosen, setFileChosen] = React.useState(false);

	const [state, setState] = React.useState({
		teacher_name: teacher.teacher_name,
		phone: teacher.phone,
		email: teacher.email,
		qualification: teacher.qualification,
		courses: teacher.courses,
		start_time: teacher.timing.start,
		end_time: teacher.timing.end,
		photo: teacher.photo,
	});

	const [selected, setSelected] = React.useState(teacher.courses);
	const [Courses, setCourses] = React.useState([courses]);

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

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleEditClickOpen = () => {
		handleMenuClose();
		setEditOpen(true);
	};

	const handleEditClose = () => {
		setEditOpen(false);
	};
	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDeleteClick = () => {
		handleMenuClose();
		setDeleteOpen(true);
	};
	const handleDeleteClose = () => {
		setDeleteOpen(false);
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

	const handleChipDelete = (event) => {
		console.log(event);
	};

	// useEffect(() => {
	// 	setCourses(courses);
	// }, []);

	const coursesArray = courses.map((course) => {
		return {
			course_id: course.course_id,
			course_name: course.course_name,
		};
	});

	const updateTeacher = () => {
		if (fileChosen === true) {
			console.log(fileChosen);
			const formData = new FormData();
			formData.append("file", file);
			UploadDeleteFile(formData, state.email, "jpg")
				.then((res) => {
					UpdateTeacher({
						teacher_id: teacher.teacher_id,
						teacher_name: state.teacher_name,
						phone: state.phone,
						email: state.email,
						qualification: state.qualification,
						courses: selected,
						start_time: state.start_time,
						end_time: state.end_time,
						photo: res,
					})
						.then((resp) => {
							// console.log("res", resp);
							openSuccessToast("Success.");
							setFileChosen(false);
							handleEditClose();
							handleRefresh();
						})
						.catch((err) => {
							openErrorToast(err.message);
						});
				})
				.catch((err) => console.log(err));
		} else {
			// console.log(selected);
			UpdateTeacher({
				teacher_id: teacher.teacher_id,
				teacher_name: state.teacher_name,
				phone: state.phone,
				email: state.email,
				qualification: state.qualification,
				courses: selected,
				start_time: state.start_time,
				end_time: state.end_time,
				photo: state.photo,
			})
				.then((resp) => {
					// console.log("res", resp);
					openSuccessToast("Success.");
					setFileChosen(false);
					handleEditClose();
					handleRefresh();
				})
				.catch((err) => {
					openErrorToast(err.message);
				});
		}
	};

	const handleDelete = () => {
		DeleteTeacher({
			teacher_id: teacher.teacher_id,
		})
			.then((resp) => {
				// console.log("res", resp);
				openSuccessToast("Success.");
				setFileChosen(false);
				handleEditClose();
				handleRefresh();
			})
			.catch((err) => {
				openErrorToast(err.message);
			});
	};

	return (
		<>
			<Card className={classes.root}>
				{/* <CardHeader
								className={classes.Header}
								action={
									<>
										<IconButton onClick={handleMenuClick} aria-label="edit">
											<MoreVertIcon />
										</IconButton>
										<Menu
											id="menu-edit"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleMenuClose}
										>
											<MenuItem onClick={handleMenuClose}>Edit</MenuItem>
											<MenuItem onClick={handleMenuClose}>Delete</MenuItem>
										</Menu>
									</>
								}
							/> */}
				<div className={classes.mediaView}>
					<CardMedia
						className={classes.media}
						image={teacher.photo}
						title="Paella dish"
					/>
					<div className={classes.Menu}>
						<>
							<IconButton onClick={handleMenuClick} aria-label="edit">
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="menu-edit"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handleEditClickOpen}>Edit</MenuItem>
								<MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
							</Menu>
						</>
					</div>
				</div>
				<CardContent>
					<div className={classes.Title}>
						<Typography
							className={classes.TitleName}
							color="textPrimary"
							component="h2"
						>
							<b>{teacher.teacher_name}</b>
						</Typography>
					</div>
					<div className={classes.TitleIcon}>
						<PhoneIcon fontSize="small" color="primary" />
						<Typography
							className={classes.TitlePhone}
							color="textPrimary"
							component="h2"
						>
							{teacher.phone}
						</Typography>
					</div>
					<div className={classes.TitleIcon}>
						<EmailIcon fontSize="small" color="primary" />
						<Typography
							className={classes.TitlePhone}
							color="textPrimary"
							component="h2"
						>
							{teacher.email}
						</Typography>
					</div>
					{/* <Typography variant="body2" color="textSecondary" component="p">
						{teacher.shortDescription}
					</Typography> */}
				</CardContent>
				<CardActions disableSpacing className={classes.cActions}>
					<IconButton
						// className={clsx(classes.expand, {
						// 	[classes.expandOpen]: expanded,
						// })}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<Typography variant="body2" color="textSecondary" component="p">
							Details
						</Typography>
						{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<div className={classes.timing}>
							<div className={classes.Title}>
								<Typography
									className={classes.TitleName}
									color="textPrimary"
									component="h2"
								>
									Qualification: <b>{teacher.qualification}</b>
								</Typography>
							</div>
						</div>
						<div className={classes.timing}>
							<div className={classes.Title}>
								<Typography
									className={classes.TitleName}
									color="textPrimary"
									component="h2"
								>
									Shift Start Time: <b>{teacher.timing.start}</b>
								</Typography>
							</div>
						</div>
						<div className={classes.timing}>
							<div className={classes.Title}>
								<Typography
									className={classes.TitleName}
									color="textPrimary"
									component="h2"
								>
									Shift End Time: <b>{teacher.timing.end}</b>
								</Typography>
							</div>
						</div>

						<div className={classes.chiproot}>
							{/* <GridContainer spacing={3}> */}
							{teacher.courses.map((value) => (
								// <GridItem sm={12} md={6} lg={6}>
								<Chip key={value} label={value} className={classes.chip} />
								// </GridItem>
							))}
							{/* </GridContainer> */}
						</div>

						{/* <Typography paragraph>{teacher.longDescription}</Typography> */}
					</CardContent>
				</Collapse>
			</Card>

			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={editOpen}
				onClose={handleEditClose}
				aria-labelledby="max-width-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Edit Teacher</DialogTitle>
				<DialogContent>
					{/* <Grid item md={6} xs={12}> */}
					<InputLabel>Profile Image</InputLabel>
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
					/>
					<TextField
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
					<Button onClick={handleEditClose} color="primary">
						Cancel
					</Button>
					<Button onClick={updateTeacher} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={deleteOpen}
				onClose={handleDeleteClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="alert-dialog-title">{"Delete Course"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{"'" +
							teacher.teacher_name +
							"' " +
							"will no longer be available as a teacher at intitute. Do you still want to delete?"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDelete} color="primary" autoFocus>
						Yes
					</Button>
					<Button onClick={handleDeleteClose} color="primary">
						No
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
