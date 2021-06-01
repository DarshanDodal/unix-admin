import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "react-draft-wysiwyg";
import { Paper, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import GridContainer from "components/Grid/GridContainer.js";
import { GetAboutUs, ChangeAboutUs, UpdateInquiry } from "../../Server/server";
import Toast from "components/Toast.js";
import {
	convertToRaw,
	getPlainText,
	EditorState,
	ContentState,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
};

const useStyles = makeStyles(styles);

export default function AboutUs() {
	const classes = useStyles();
	const [editorState, setEditorState] = React.useState(
		EditorState.createEmpty()
	);
	const [refresh, setRefresh] = React.useState(false);
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
	const handleEditor = (st) => {
		setEditorState(st);
	};

	useEffect(() => {
		GetAboutUs()
			.then((res) => {
				const contentBlock = htmlToDraft(res.data.section_1);
				const contentState = ContentState.createFromBlockArray(
					contentBlock.contentBlocks
				);
				setEditorState(EditorState.createWithContent(contentState));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [refresh]);

	const Update = () => {
		// console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		// draftToHtml()
		ChangeAboutUs({
			update: "section_1",
			value: draftToHtml(convertToRaw(editorState.getCurrentContent())),
		})
			.then((res) => {
				openSuccessToast("Success.");
				setRefresh(!refresh);
			})
			.catch((err) => {
				openErrorToast(err.message);
			});
	};
	return (
		<div>
			<Grid
				container
				style={{
					padding: 15,
				}}
				justify="flex-end"
			>
				<Button onClick={Update} variant="contained" color="primary">
					Save
				</Button>
			</Grid>
			<GridContainer component={Paper}>
				<Grid item>
					<Editor
						editorState={editorState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName"
						onEditorStateChange={handleEditor}
					/>
				</Grid>
			</GridContainer>{" "}
			<Toast
				open={openToast}
				handleToastClose={handleToastClose}
				severity={severity}
				message={message}
			/>
		</div>
	);
}
