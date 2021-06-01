/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Teachers from "views/Teacher/Teacher.js";
import Typography from "views/Typography/Typography.js";
import Inquiry from "views/Inquiry/Inquiry.js";
import Feedback from "views/Feedback/Feedback.js";
import AboutUs from "views/AboutUs/AboutUs.js";

// import Login from "views/Auth/LoginView.js";
// import Register from "views/Auth/RegisterView.js";
// import AccountConfirmation from "views/Auth/AccountConfirmationView.js";

import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import StarIcon from "@material-ui/icons/Star";
import FeedbackIcon from "@material-ui/icons/Feedback";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import BusinessIcon from "@material-ui/icons/Business";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		rtlName: "لوحة القيادة",
		icon: Dashboard,
		component: DashboardPage,
		layout: "/admin",
	},
	{
		path: "/students",
		name: "Students",
		rtlName: "ملف تعريفي للمستخدم",
		icon: Person,
		component: UserProfile,
		layout: "/admin",
	},
	{
		path: "/teachers",
		name: "Teachers",
		rtlName: "طباعة",
		icon: SupervisorAccountIcon,
		component: Teachers,
		layout: "/admin",
	},
	{
		path: "/courses",
		name: "Courses",
		rtlName: "قائمة الجدول",
		icon: "content_paste",
		component: TableList,
		layout: "/admin",
	},
	{
		path: "/inquiry",
		name: "Inquiry",
		rtlName: "طباعة",
		icon: LibraryBooks,
		component: Inquiry,
		// component: Typography,
		layout: "/admin",
	},
	{
		path: "/feedback",
		name: "Feedback",
		rtlName: "طباعة",
		icon: FeedbackIcon,
		component: Feedback,
		// component: Typography,
		layout: "/admin",
	},

	{
		path: "/about-us",
		name: "About Us",
		rtlName: "طباعة",
		icon: BusinessIcon,
		component: AboutUs,
		// component: Typography,
		layout: "/admin",
	},
	// {
	// 	path: "/icons",
	// 	name: "Icons",
	// 	rtlName: "الرموز",
	// 	icon: BubbleChart,
	// 	component: Icons,
	// 	layout: "/admin",
	// },
	// {
	//   path: "/maps",
	//   name: "Maps",
	//   rtlName: "خرائط",
	//   icon: LocationOn,
	//   component: Maps,
	//   layout: "/admin"
	// },
	// {
	//   path: "/notifications",
	//   name: "Notifications",
	//   rtlName: "إخطارات",
	//   icon: Notifications,
	//   component: NotificationsPage,
	//   layout: "/admin"
	// },
	// {
	//   path: "/rtl-page",
	//   name: "RTL Support",
	//   rtlName: "پشتیبانی از راست به چپ",
	//   icon: Language,
	//   component: RTLPage,
	//   layout: "/rtl"
	// },
	// {
	//   path: "/upgrade-to-pro",
	//   name: "Upgrade To PRO",
	//   rtlName: "التطور للاحترافية",
	//   icon: Unarchive,
	//   component: UpgradeToPro,
	//   layout: "/admin"
	// }
];

// const userRoutes = [
// 	{
// 		path: "/user",
// 		name: "Dashboard",
// 		rtlName: "لوحة القيادة",
// 		icon: Dashboard,
// 		component: Login,
// 		layout: "/login",
// 	},
// 	{
// 		path: "/user",
// 		name: "Dashboard",
// 		rtlName: "لوحة القيادة",
// 		icon: Dashboard,
// 		component: Register,
// 		layout: "/register",
// 	},
// 	{
// 		path: "/user",
// 		name: "Dashboard",
// 		rtlName: "لوحة القيادة",
// 		icon: Dashboard,
// 		component: AccountConfirmation,
// 		layout: "/confirm-account",
// 	},
// ];

export default dashboardRoutes;
