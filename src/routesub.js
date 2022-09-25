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
import Dashboard from "views/Pages/Dasboarsubcri/index.js";
import Reactabla from "views/Pages/Dasboarsubcri/Tickes.js";
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
import Eventos from "views/Pages/Evento";
import PerfilPage from "views/Pages/Perfil";

var routes = [
  {
    path: "/inicio",
    layout: "/panel",
    name: "inicio",
    icon: "nc-icon nc-layers-3",
    component: Dashboard,
    permiso:["admin","superadmin","subscriptor"]
  },
  { 
  path: "/datos",
  layout: "/panel",
  name: "Datos",
  icon: "nc-icon nc-satisfied",
  component: PerfilPage,
  permiso:["admin","superadmin","subscriptor"]},
  { 
    path: "/tickets",
    layout: "/panel",
    name: "Tickets",
    icon: "nc-icon nc-notification-70",
    component: Reactabla,
    permiso:["admin","superadmin","subscriptor"]},
 
 
  
];
export default routes;
