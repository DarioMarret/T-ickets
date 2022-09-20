/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/RegularTables.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import ReactTables from "views/Tables/ReactTables.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import Misdatos from "views/Pages/Misdatos.js";
import Ticket from "views/Pages/Tickets.js";
import Espacios from "views/Pages/Espacios";
import Eventos from "views/Pages/Eventos.js"

var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard
  },
 
  {
    path:"/tickets",
    layout:"/admin",
    name:"Mis Tickets",
    icon:"fas fa-ticket-alt",
    component:Ticket

  },
  {
    path:"/espacios",
    layout:"/admin",
    name:"Espacios",
    icon:"fas fa-user-cog",
    component:Espacios

  },
  {
    path:"/eventos",
    layout:"/admin",
    name:"Eventos",
    icon:"fas fa-user-cog",
    component:Eventos

  }, 
  {
    path:"/referidos",
    layout:"/admin",
    name:"Referido",
    icon:"fas fa-bullhorn",
    component:Eventos

  },
  
  {
    path:"/influencer",
    layout:"/admin",
    name:"Influencer",
    icon:"fab fa-tiktok",
    component:Eventos

  },
  {
    path:"/sorteos",
    layout:"/admin",
    name:"Sorteos",
    icon:" fas fa-dice",
    component:Eventos

  },
  {
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    views: [
      {
        path: "/user-page",
        layout: "/admin",
        name: "User Page",
        mini: "UP",
        component: UserPage
      },
      {
        path: "/login",
        layout: "/auth",
        name: "Login Page",
        mini: "LP",
        component: LoginPage
      },
      {
        path: "/register",
        layout: "/auth",
        name: "Register",
        mini: "RP",
        component: RegisterPage
      },
      {
        path: "/lock-screen-page",
        layout: "/auth",
        name: "Lock Screen Page",
        mini: "LSP",
        component: LockScreenPage
      }
    ]
  }
];
export default routes;
