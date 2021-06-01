import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
	palette: {
		background: {
			dark: "#F4F6F8",
			default: colors.common.white,
			paper: colors.common.white,
		},
		primary: {
			main: "#9C35B3", //'#F44545' //'#fa5050' //'#e84e4e' //colors.indigo[500]
		},
		secondary: {
			main: "#9C35B3", //colors.pink[500]
		},
		white: { main: "#fff" },
		error: { main: "#f44336" },
		info: { main: "#2196f3" },
		warning: { main: "#ff9800" },
		success: { main: "#4caf50" },
		errorFade: { main: "#e57373" },
		infoFade: { main: "#64b5f6" },
		warningFade: { main: "#ffb74d" },
		successFade: { main: "#81c784" },
		action: { main: "rgba(255, 255, 255, 1)" },
		// success: {
		// 	main: colors.green[500],
		// },
		failure: {
			main: colors.pink[500],
		},
		text: {
			primary: "rgba(255,255,255,1)", // colors.blueGrey[900],
			secondary: colors.blueGrey[600],
			sucess: colors.green[500],
			failure: colors.red[500],
		},
	},
	shadows,
	typography,
});

export default theme;
