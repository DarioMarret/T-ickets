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
import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import Ticket from "views/Pages/Tickets.js";
import Espacios from "views/Pages/Espacios";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import Eventos from "views/Pages/Evento";
import PerfilPage from "views/Pages/Perfil";
import Dashboardsub from "views/Pages/Susbcritorpage/index.js";
import Reactabla from "views/Pages/Susbcritorpage/Tickes.js";
import ReactTables from "views/Tables/ReactTables.js";
import SuscritorViews from "views/Pages/Suscriptores";
import UsersView from "views/Pages/Usuarios";
import SuscritoridView from "views/Pages/Suscriptores/Suscritorid";
import UseridView from "views/Pages/Usuarios/Usuarioid";
import TablasEjemplos from "views/Tables/Tablaejemplo";

var routes = [
  {
    path: "/Inicio",
    layout: "/admin",
    name: "Inicio",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    permiso: ["super_admin", "subscriptor"]
  },
  {
    path: "/inicio",
    layout: "/admin",
    name: "inicio",
    icon: "nc-icon nc-layers-3",
    component: Dashboardsub,
    permiso: ["admin"]
  },
  {
    path: "/datos",
    layout: "/admin",
    name: "Datos",
    icon: "nc-icon nc-satisfied",
    component: PerfilPage,
    permiso: ["admin"]
  },
  {
    path: "/tickets",
    layout: "/admin",
    name: "Tickets",
    icon: "nc-icon nc-notification-70",
    component: Reactabla,
    permiso: ["admin"]
  },
  {
    path: "/suscritor/:id",
    layout: "/admin",
    component: SuscritoridView,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/usuario/:id",
    layout: "/admin",
    component: UseridView,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/tickets",
    layout: "/admin",
    name: "Tickets",
    icon: "nc-icon nc-tag-content",
    component: Ticket,
    permiso: ["superadmin", "super_admin"]

  },
  {
    path: "/espacios",
    layout: "/admin",
    name: "Espacios",
    icon: "nc-icon nc-map-big",
    component: Espacios,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/eventos",
    layout: "/admin",
    name: "Eventos",
    icon: "nc-icon nc-paper-2",
    component: Eventos,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/suscritor",
    layout: "/admin",
    name: "Suscriptores",
    icon: "nc-icon nc-mobile",
    component: SuscritorViews,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/usuario",
    layout: "/admin",
    name: "Usuarios",
    icon: "nc-icon nc-single-02",
    component: UsersView,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/referidos",
    layout: "/admin",
    name: "Referido",
    icon: "nc-icon nc-notification-70",
    component: Eventos,
    permiso: ["superadmin", "super_admin"]
  },

  {
    path: "/influencer",
    layout: "/admin",
    name: "Influencer",
    icon: "nc-icon nc-note-03",
    component: Eventos,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/sorteos",
    layout: "/admin",
    name: "Sorteos",
    icon: "nc-icon nc-controller-modern",
    component: ReactTables,
    permiso: ["superadmin", "super_admin"]
  },
  {
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    permiso: ["super_admin"],
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
  },
  {
    collapse: true,
    path: "/forms",
    name: "Forms",
    state: "openForms",
    icon: "nc-icon nc-notes",
    views: [
      {
        path: "/regular-forms",
        layout: "/admin",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms
      },
      {
        path: "/extended-forms",
        layout: "/admin",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms
      },
      {
        path: "/validation-forms",
        layout: "/admin",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms
      },
      {
        path: "/wizard",
        layout: "/admin",
        name: "Wizard",
        mini: "W",
        component: Wizard
      }
    ]
  },
];
export default routes;

