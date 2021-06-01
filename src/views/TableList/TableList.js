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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import AddLibraryIcon from "@material-ui/icons/LibraryAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput.js";
import CourseCard from "./CourseCard";
// import EditDialog from "./EditDialog";
import Toast from "components/Toast.js";
import { useDispatch, useSelector } from "react-redux";

import { infoColor, hexToRgb } from "assets/jss/material-dashboard-react.js";
import {
	UploadFile,
	GetCourses,
	NewCourse,
	UpdateCourse,
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
		height: 373, // 428,
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

// const courses = [
// 	{
// 		title: "Tally",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "10,000",
// 		image:
// 			"https://upload.wikimedia.org/wikipedia/commons/0/09/Tally_-_Logo.png",
// 	},
// 	{
// 		title: "C programming",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "15,000",
// 		image:
// 			"data:image/png;base64,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",
// 	},
// 	{
// 		title: "Advanced Basic",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "15,000",
// 		image:
// 			"data:image/png;base64,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",
// 	},
// 	{
// 		title: "Photoshop",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "17,000",
// 		image:
// 			"data:image/png;base64,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",
// 	},
// 	{
// 		title: "Coral Draw",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "12,000",
// 		image:
// 			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAACvCAMAAABqzPMLAAACbVBMVEX///8AAAAAmD4qxksAmjcAhj8AlVBmZWWXzBoeEg1zNYoUAAAcDwkLAAAVAABZVFL5+PiGg4JpaGinpaQGy/YYBgAAiwBhYGCcmpnHxsXP1wlfWljk5OPH1wzQ1wi0srGQjYyQyQDB2A46MzEAlSbxmgouJiNRTEpybmxzuoQSqOIAlCEXxEC62BHnXybFw8Pa2dkloEoTquEVr96w2BXlUyjjPyrt7OwPo+UAgy0AjT612b3kSSknHRkXtNvy+fTT8djU6dltJ4WiGD3EAADfAABisnUAxcsNnukkzct33Pnh8OWl0a+Xy6O73MJjsYQovU0cqki5osPq9Nm423a96sSDLnh8C2ra7LuQKGmWI1uaH1CZACamGDr4+ujsfxjazRHqch7jOwD64t3C3/ji8fyh1u+/5/JstPMAl+3i9Pk9wdqx1PkAgu2Cv/SQy/Fkw+UAtc+b3udmqvkAgPVXzdmZ6N4Ad/Zn2dVQ3cvO9O4PvvaK1OYKmu8f0MgAkMMRlKsUkpIQj3kPjGKCuZ0v4L9Lm2MTs4ofvqQA4LcPsq638N8Px+cPqpREqV6DwpFhr5gAgEdNoHyi4q2Q3JxZhHJs2n2Ua6V2d4rNvdRox3uxib1zQopjtTCz2WpXsQ7L5Z9XeHHHtc9jzUKpbZTC31RxAHCbVIfGm7BVi0GPPXqeQnDInrOXIliuXnyaNkfQ42+OVUZ8fEmnsjm5QDTpsBPe546lABDKWizgwxLvrGfvihH4z6Dgv8XJeICwOE3wlzz41sDRbnHw8b/eoaPBGSHwpIHZ3k/QODXqflPtkorWX1/u7KXrg3HobFNv2K5aAAAU2ElEQVR4nO2di38TV3bH5xoFIyThEcK2hIU1RsIWsUFjYjzhoXWMgbD4EYjDKzYvQ5ZCQrZJt+2SNtm22STdbWovm2wI2SylSdmkzSah7Qa6pWaXQAIBwt/Uc859zNUD84plfUb6fT6rmbl3Zjz3q/O6d0TWMMpCB597hm8fWfED2jly6NBMPk956eCfHT5IO888+ujDK1ZIRM8+W2WEeu7w0ef53g83PfowAHpkxZ/z40MvvPDizD1Xmei5o0ePcvMxnt/0KAf0yCPf4y1Hnn3h8cpGdBDwHObRh/goQIKQ8ZePP16ZiI7Q51/8CPiYvOW5l3MA/a04EQl9n87u6ZmJB50ZvUjR9yDgOXpU8Hnm8KYcQN+TAZoIkRG99Fcz8rCl15EFZBE//GvkI/zL2LQpD5B0MgMBff/HtHvspdI/bel1aAFtNi/4m6NHfyTis3HwcAEg6WQ9COiVV8jBjlWAEW3mfBagXn5etr788stE6OEVnA7qiOh7iQC9QofHjpX+iUurBRofsQ86+JO/+/t/ePX4Kk0PHf+p7P0xJ0T+dew1b8fqXD7SRozXV61a/VC+Vqmr3vjHV1xCP/MyIcFE8Nksm3tWFdBBQEOyf6ghlep8443X6OLXPGxDCxZQ8t7M+byg2geKAnroCXXCuM/nS6Xaa3C/52evlfq5S6XN3GY4n5/PHlQdrxflo/lYb7sPlRrHg3/yKqEXeQA6BHTe/OfVq1e7Pe2dxQH1qjPGCZCvnaCOdy4t8aOXREeEgxGe2bNXqyRl9PpqagpjNMg9ZYibkK+hHw562tsHSv74068F0sEQDwByQ+0gACqK6HX3ap9QJ12Qau8v8dNPvzbzDHbk54Rn9mw3Ahsba7gKELlBCJgIJyPbEaC8pCPCgJ4QfFYPuX2+mpriiFa5dtIvfMyXwqOBlOecTJSF/YLPbC1E96RqaoojWqVR7JSAiEzK1+6tauiQmFc8IfjoHtarA8pBtEozE+ljPh8/Sk2UdgTTrAU8hfUoA1rj9g34anK1WjHSMCofax/iR54yIWlAAwqQloUm8gG5ZqSlMUNZEFWL477UoOEdQQr7BW5nK2mdGwv5KEb6aRJQA5rOQIqHa2/IXPDmcXKM1UVCkDFeHBAy0vK8G4RS6J7oY72GV/SDN48fR59yPUxP0rflU1OT0uJMrwxCvo14CBbknQnH5uOvHsetymGr9S8/NQUgLVT1KEDkWxt9HvKx46+++kvcqgi0Ws9AUwHKASkBUf4Cj/PMfKMHDAjnnSrJ62Vibp2YJ59WKcoZvY8HnzXgY0OGN9QLgCiwKkB6EuufCpBWLhlLlYthBIOQ5JlEv61jyxb8snsVIL2+6Z0KkB7MJ1QawyIa0phnovRbHbM6HoPttq3FsvxdAxpQgBAMxOzUxpIOY/okAcF21patnQDop1rvXQMaUlEawWBS8yIg1JatevDoLTLTUID0E4dyCyEPAdqWB2hWx1ta710D6s0H5JkYNC2AMAZ5ZcXjMQC0zSBQ3wkgshzMYl5ZVezv4EjuA5COwAU0wY88UygaHR0dbxtkSUUAPdaxZes9AkK7gpzmnen83F9teccgSypmQdi65S4AqSxG6x0DXlqWPrFu3bu4VYDe1joFtqJmlDPVUHUQWQ7U1e0lHcR06sl1c9fhdpYE9J7W2SOxzSpElDNZVZU0zeLHxdqrJ3QSADmwfU+yeEfrdAEVeloOILWkSJbj806WN4w4ADoJ21+/u0X4k96rAcpHlLMepCar+FYVy6A1hmcEgJ400JLW/YpwdOidOYByg5G+ouiu2mMZBDO4lFfWy0An5s49YXBLen8cgHTo+WdWvlwr0tekxbvVGv56/nTLnJbSjmFaJaP0urlz5657d1ZHh+46WwoIKUQ5q87tNb7Ub34zZ07LMBycaplzqpQjmGbZIkqDJQGhueM085B6pxCQROTTTuv/lzlcZDlgQKdLOYLpFgD6wCBLIkT/qhdC73UUI8STvnbazhYB6Awc7GnhhuQZnZi77tcG5XtO6ITW93ZxQGhEeqVzWgAiy9nprRBkGB9oQYik9b11G0BgRPqK2FMSEA9BLU+VdADTLQcA2YYIQmhCptu37baAcqYkc/JC0M7SjmC69T6vhD6QPnbS7Xrs9oD0Sa00IExew17zMCLzvkGWxAE96Xb13w7Qh12alQxLQNj2VEuLl5I8yhSJ/n3is327HqVvA2jOsi4tUakYjbXjHM95GOUxtBpI9NtRO7Su4uazbFlX1x73pFNakvegh1GGRx+L/3Y7BxR3u4pVil3Ip0u7Ps/DvJXDSOvm/hZ9bLsA9IHbU1gpfrh42TIk5J4zrHuY16pErifXbScf24F8du36N7enoBCaQ3yWLTvjniNDEMZmqBLP5N/dA3LAuXCzA/GA3J78QqhL8Fmm+dGpFtfDoEr0XIhGfbR9B1Y/H+3islVHXiG0GEWATrsXd7lV4h4vhmjUyR3bP8KNAPSx6jD/XSP04aJFitBldcrOLiJEsfl0i7cm8q7+Y9cODNOcz9OfuB0j44rQhwsFICTkZvmnuogQxeYWHqk9qJM7yGw+BjqgTx3V8dnIVgkI+LiE3Eu7ujghA0O0F3M8FxgOTFLjT5M+nVTtH/eNiGXFhQRoUT6gYQLURbEZ7GhPkXt7QpO7dv0ONp8AHdBnbntf3+fEZ5EAxAmdVSec5oCwLhr2sAEZBhgOfE4inpGREbXkMbm7r+8/IQwtbl6oEzqnrlvG+SCZUx42ICDx9NNoQkgHpHzMHO3r2/1fs7qaEZBLSCWxPcKA9njdgMCEPv0UPn/HAbk+1rcb9N/NzbmElKWcpolZF5bPZzybwrgmR0bAhMw+ArRb+dhF4PP7JfvyCKmr+MQMFz+GuZ95WJ+MjBiUtkb6+vqUj10Z3b17yZIlzZIQIboqe/e4M7MzXV2eNiDDsPvQhByIyqDPZevk+d0XANAXC3VCKkafIz64vAgGdHpGHruE+qyvDz4vEqBRWSs65/9nCeoPug2pGC3mrgYZ0Iw8dCkFxgPltIN5a/foFdk6SnyWXNinEZIxengZEQIDutzV5clpfK4+JsPBsAySjf9LeC5c4GGIR2rZd5ZPzAwsh7y4DlSgvt0X0amQz/kDou3/OJ8Le79QhFSM5vOOnZjtuzxcI7qaHEUuF0d3j46OXhRtly6Q9u7dv08SkjH6Mp+6Gpjtz93mlh7T56N/RBMCPqPnZSnE8QCgvc2CkIzRV2naAUdn9em9p+WcPw/R+SIQ+uorGab/xPGAhJM1i45hPu3AWK0toHlcV86D5TjrvwL9XjR9LfnsXy4ymeg4S0X1ZUz2FRGhuf54HoLPRQS0XoTpSxLP8uX7CZAMN3zaYRg3Fy/2eA2t68B6AGOSCX3JW8z9ks/yleRkwp1uLsKietjo0Sb3laAr66/hB5qQCNMSDxJCQCKhU0V0FYuhCnIw1I314GTkYyJMf63wrFz5JxWjL4ua+vKiRbe/lydlopNNognt5w2XXD4ru/fJEHQVS8ZzGIkqysFQk+hkN4DQ3kt0bI5JPCtXrt0vQtAekc/OLqqQElHXl+BcEKxX7hcmpPCsXLu2+w88BJ3l4Xq44hyMdA2c7Mr65fv3cxP62uWzdu1yaupBPlcxUlfEHCxfDjrZNchd39DhpTGFZ233dWo6x9PZ2YUVF4C4JtdfNw6AZ41RsWiOSTxru8f4YizyuWlcbq7AAMR1ff0keNby5d/S0S1pPt3dG6g4ukkO1tN8dcqbeFo31hvGN9KErks83d23qJdPWa82T3kLj+vaN+RaZEIHxiQfHoJuUga72VyRAVrKHLuC0Zmb0JjA072BDmnGOryvQgO01AGAcX1sLZnQrW4JCI+ufIHBB4J0hevSGJBZSyZ0ZUwAIlzdyzEAnb3D5RWg6xCR144hkwMbhAHh/PXKhg17jHMVnMBcfXsdQhGFHelh+D5xA7QMV3QCc3XrABgPZvbrHNA13AUzMvfN8IOVjW6ZxiSa0OQGmeTNDfBxzbzzpRWibzHmwHaDTPI3voTp/oE7XlcxMsFerkNoviGS/IEbQKzKR5MDs9PrJpgRAELjAUZVPjlyMARB6AEDmoQdw6zyyZNJ/7vRfa2b9qvxuaqqqqqqqqo8o8b5eWqM3/miSpLVWJurppl+ojJTIg9QozXTT1RmspvyACVm+onKTXV5Hmbf+ZLKUjjXx+pm+nnKTpFcQOmZfp6yUywHUGNkpp+n7OTkBKHG2Ew/T/kpNwQ5d76g0hRt1FQ7009TVVVVVVVVVVVVVVVVVVVVVVVVVapiaT9jbdF7+zVPJpHI4DYRISXc9fmIVEJfD4pjA+1FIxFxciYSEW8WE9hmJjLl+KLRSbJQ0B+sZ+yeVkibgClu25hQQF7OXGmL0mE8pu8Avo0wb4M9i++FGIsZCdADDWVaZLN5/hAN0M+i93BdbSBALy3qxOX1QZbkFlMf5C0s5GdJdX4oyOoZjT8dChBaw2T+eXVyD+BlIlG77BYhHRb0s7SNL/200dyFXEAhy3HiiSTzB0JkIfXBUNh0oM2CYQtbge+B2ckQvYqOsGCI2mLM72eiNxhEr42V3zJ/Egwnw3ej9/TtuYCE4UWAECFGQIZsYuJ0izHDCpGP2dBKfyqKVkvhKMMCuD7rlN+LxgQ8bP63ZkaaknWWoBW2oNtJZ5Om7BHBvAAQ3Qt9yAUEu0y82QiG0mAx3MeYwFLHwiHeEmX35N4lVLK+Pt+xEhCOQiH5xBiKMyxUH+I9EFgYH3MhIGiim2mA6gLCPG1iwwJN/I8KUMxuDVEcT8vzyk2O+NI1YYQINSZZkKcgFmiMsQBj86mHzQ9jDybjIoBsCrU6oFZpQeBdDvFC8wuH6IQ4ZLV0yI/dgKzsojMpI8OBki0Caww4IDoWTAZYo22aGEhDSCbCKAkVASR8xwWU4cRA2UCWLqV7JhhdmmBZNEqH/gozylKRgidrm8fHDY8eDBg45iCzqAG+fm5sTQEcVDFASTIYAGTJW4gsZjNiZnMfs3kaC4ONghVl0JADZfo7hygk+ZwGRwZQMvsYAgrMp0NTnZqhQRUFVM8BiToI+CTl3+ExJhAki+KG1YrpgUrFGBNIy04FFpSggoQUpaeGsfDyP8PmNcVIEaq5pwRUj1UiFDmykm4Vf0ZkLTgPJhYMv4qmUBu5XnnGaC1ICEVdY4dIkSZAjjj0B5g0jOhtYpBwsfq6SMTS4n+cBbM0O0sHAo2G4ARJn/4go+NynIQZ3KNyvjsNEBRv83MABbOtQv7iFhTnJ4sgnawPZtVdIZLx6QxVjgk0zijN5WJoRxDepn2o96lkvZgXCSXcoKRcjAPKMJW8SUUAhUOERADCfBiVf8UvjC9EZkXBuonB7dHRIsa83IcoJyXyTCiuYg4GiowGKC5nUEKFgGxRlcs0nw7xkEw3FVdZIZpTYKQTcScJgSqPfVkpC7MBuTqDIRVMiv9qJcbjt1soZYM5k5ICQHBBPfmUBAT+y+vkiKig6SRi1QZRmldAkOyzDsuvVstINoYHnF45YVqmQTOwqJ3zcAG5xkajEfMKAci054NVcONThaIlzBFsUaHlNwFnnCfSZQa4qu+oHJXB9Q6W9cvVGwioLBuuAz5kSVqpnYb9ukjCytJwwyF/IOu460EB2PBhupV0IIjBRautsNzE0A+wgwFeA0Bv0F+2MRplB1i9PxgMhkTVG2EhmKzKIxi6ysAWC/EKEH3LRrA2riiGUNAaFgUDUyuGkK3AXuCGLgA8MLGAVguYIWhpnf5hPogiuGwaSEsQjtUWTIbFkRW13MmaYyUZS1qicvTTvD4aJkUzqp6Co4S7a+EZbvCKQ5ON69ZRcRsjEtb7y1VO9d/fVlXV9MqO8ZhgglSj3HUbxZY2ss2J2Xk7pLi8o3alKW4mbujulbtoNTWJA6I0Vc9rP4cxt5elaWmLJ+dGnJAkaYLg1OEUAhcO03iWmqC2ijvaYlERy6U4JTWhKC6coBr5Fb3jqZpBvteZ2sj/w9z9S0XLePt47/QimFIWS9um3YYDZuF43LaYhc2Q3sgkEsyO24ksrafyDJ7GkqkN62OHBTNOPI1zcpZw4lFZFbAk3LEuWQjIicXgL9mxmAN1dQK2wuzWNEwMDTYshb1e2Bv3YVtDQzs2YEvvRMPMEbKZRVtazKLdMJlOW6SWeCRoTuVg5VIAqI7Pt0x5pSgKMhyUWQgI1cSXDGL6KsfQEHwMNIDldG6EvfYB+Ojt7yRA49iytOY7G/C9Kq1VsszCT0JisniCqSM0rkJAcW0WYWm3zKixFwNUVwQQqR/MpIdMZek4NXBADUPU13/fI3xAMW0yzSz8tPiyDViNbbiArEJACXfRv1Gfcpo8ohl3AJT/LqMXIPSiFYEtUYMGyGhYc/9DfCCZ+jSd5uYZQlYHATlrGUTKwFkawMom06ikBGS5xmcmWauLKMZYLQWXKQHNh3tZ2qNM+DAY4d4QYRKAfDw0DXxnQ743OWKhOBsw5W8zMFeZODIL59wJBuNoZZaBgObX1tbOb5WAwvo8E+I4U/9GzLQYa7tNDFKAmmprGzXz7UcjKQJooGGwd7DTNzgtw7+zTLKaRMJCT2LpWIyv8GRYBNviAlCU7CHfxaK5E/FMVl+5iLLsvblYJwaeIoCMgU7fBI/bMyKxRmYzkYuIlDHfnwThuBIuhXxAmfylHP03QXBhTEFBP75DkN7YjlB4DFqjxyBSz8zl+TAPwgoQH6X4NU+rCtKofEAmy1stbdNfAZLzcnuMoyFNDWiCpymRxTqpTQM01PAAQ3wwOfzHYi6gCDx5hts/pqkpAAFc8qC0EW+jyQNdD94V5RfH8dUXnYBWOKWLDUoLceugHEA1G7+Lsd6fMiwQTVi0rsUsbAi1GWn+0gYDlAYopAOiYbaxdCLiZ47NWDgRDfEfUYGXtkYTYbLEOPNHEnVkjwoQf4sRY2mLloxQAw3jgxMg9LFBmHZA09DEoA8aTTCnoaHO9pn8vwWKh7MsSb/8aSLHitXFa0XKDofhSAFK84ogipzEyGBC4sfVRDMKed6SZ9ppP2vjt4inA6yNyDh1PGJZ/Eq7Fv8TMeKf109sJKHFAAyai63hTT1Gz4QvtfQB+Pw/f2lYC06q79sAAAAASUVORK5CYII=",
// 	},
// 	{
// 		title: "AutoCAD",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "12,000",
// 		image: "https://1000logos.net/wp-content/uploads/2020/02/AutoCAD-Logo.png",
// 	},
// 	{
// 		title: "Spoken English",
// 		shortDescription:
// 			"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
// 		longDescription: "",
// 		price: "12,000",
// 		image:
// 			"https://leverageedu.com/blog/wp-content/uploads/2020/05/How-to-Learn-Spoken-English_.png",
// 	},
// ];

export default function TableList() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [editOpen, setEditOpen] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [courses, setCourses] = React.useState([]);
	const [fileChosen, setFileChosen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);
	const [courseName, setCourseName] = React.useState("");

	const [editDialog, setEditDialog] = React.useState(false);

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

	var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

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
							setState({
								courseName: "",
								price: "",
								description: "",
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
				{filteredCourses.map((course) => (
					<GridItem key={course.course_name} xs={12} sm={12} md={4} lg={3}>
						<CourseCard
							course={course}
							handleRefresh={() => {
								setRefresh(!refresh);
							}}
						/>
					</GridItem>
				))}
				<GridItem xs={12} sm={12} md={4} lg={3}>
					<div onClick={handleClickOpen} className={classes.rootBlank}>
						<div className={classes.rootBlankCard}>
							<AddLibraryIcon className={classes.addIcon} />
							<Typography className={classes.addLabel}>New Course</Typography>
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
				<DialogTitle id="form-dialog-title">{"New Course"}</DialogTitle>
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
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={newCourse} color="primary">
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
