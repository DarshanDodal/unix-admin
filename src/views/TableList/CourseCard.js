import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Input, Box } from "@material-ui/core";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Toast from "components/Toast.js";

import {
	UploadFile,
	GetCourses,
	NewCourse,
	UpdateCourse,
	UploadDeleteFile,
	DeleteCourse,
} from "../../Server/server";

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
	cActions: {
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
};

const useStyles = makeStyles(styles);

export default function CourseCard({ course, handleRefresh }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [deleteOpen, setDeleteOpen] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [fileChosen, setFileChosen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);

	const [editDialog, setEditDialog] = React.useState(false);

	const [state, setState] = React.useState({
		courseName: course.course_name,
		price: course.price,
		description: course.description,
		photo: course.photo,
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
	//Menu Handles
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

	var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	const updateCourse = () => {
		if (fileChosen === true) {
			console.log(fileChosen);
			const formData = new FormData();
			formData.append("file", file);
			UploadDeleteFile(formData, state.courseName, "jpg")
				.then((res) => {
					UpdateCourse({
						course_id: course.course_id,
						course_name: state.courseName,
						description: state.description,
						price: state.price,
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
			console.log(fileChosen);
			UpdateCourse({
				course_id: course.course_id,
				course_name: state.courseName,
				description: state.description,
				price: state.price,
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
		DeleteCourse({
			course_id: course.course_id,
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
				<CardHeader
					action={
						<>
							<IconButton onClick={handleMenuClick} aria-label="settings">
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handleEditClickOpen}>Edit</MenuItem>
								<MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
							</Menu>
						</>
					}
					title={course.course_name}
				/>
				<CardMedia
					className={classes.media}
					image={course.photo}
					title="Paella dish"
				/>
				<CardContent>
					{/* <Typography variant="body2" color="textSecondary" component="p">
						{course.description}
					</Typography> */}
					<Typography align="center" color="textPrimary" variant="h6">
						Price: <strong> {formatter.format(course.price)}</strong>
					</Typography>
				</CardContent>
				<CardActions disableSpacing className={classes.cActions}>
					{/* <IconButton aria-label="add to favorites">
								<FavoriteIcon />
							</IconButton>
							<IconButton aria-label="share">
								<ShareIcon />
							</IconButton> */}

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
						<Typography paragraph>{course.description}</Typography>
					</CardContent>
				</Collapse>
			</Card>
			<Dialog
				key={course.course_name}
				fullWidth={true}
				maxWidth={"sm"}
				open={editOpen}
				onClose={handleEditClose}
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
					<p style={{ color: "blue", fontSize: 14 }}>{state.photo}</p>
					<TextField
						required
						autoFocus
						margin="dense"
						label="Course Name"
						type="text"
						name="courseName"
						fullWidth
						// value={name}
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.courseName,
						}}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
						label="Price"
						type="number"
						name="price"
						fullWidth
						onChange={handleTextChange}
						inputProps={{
							defaultValue: state.price,
						}}
						// value={price}
						// onChange={handlePriceChange}
					/>
					<TextField
						required
						autoFocus
						margin="dense"
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
						{"Save"}
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
						{"Course '" +
							course.course_name +
							"' " +
							"will no longer be available. Do you still want to delete this course?"}
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
