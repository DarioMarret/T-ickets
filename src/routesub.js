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
import EventoEspecifico from "views/Pages/Evento/MODAL/Evetoespecifico";
import Dashboardsub from "views/Pages/Dasboarsubcri/index.js";
import Reactabla from "views/Pages/Dasboarsubcri/Tickes.js";
import ReactTables from "views/Tables/ReactTables.js";
import SuscritorViews from "views/Pages/Suscriptores";
import UsersView from "views/Pages/Usuarios";
import SuscritoridView from "views/Pages/Suscriptores/Suscritorid";
import UseridView from "views/Pages/Usuarios/Usuarioid";
import TablasEjemplos from "views/Tables/Tablaejemplo";
import AjustesView from "views/Pages/Ajustes";
import EsquemaViews from "views/Pages/Esquemas";

var routes = [
  {
    path: "/Inicio",
    layout: "/admin",
    name: "Inicio",
    icon: "nc-icon nc-layers-3",
    component: Dashboard,
    permiso: ["superadmin", "super_admin"]
    
  },
  {
    collapse: true,
    path: "/Getion",
    name: "Gestion de Eventos",
    state: "openGestion",
    icon: "nc-icon nc-notes",
     permiso: ["superadmin", "super_admin"],
    views: [
      {
        path: "/Espacio",
        layout: "/admin",
        name: "Crear Espacio",
        mini: "*",
        component: Espacios,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Evento",
        layout: "/admin",
        name: "Evento",
        mini: "*",
        component: Eventos,
        permiso: ["superadmin", "super_admin"]
      },
      
      {
        path: "/Diseñar-Ticket",
        layout: "/admin",
        name: "Diseñar Ticket",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      }
    ]
  },  
  {
    path: "/Eventos/:id",
    layout: "/admin",
    component: EventoEspecifico,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/usuarios/:id",
    layout: "/admin",
    component: UseridView,
    permiso: ["superadmin", "super_admin"]
  },
  {
    path: "/suscritor/:id",
    layout: "/admin",
    component: SuscritoridView,
    permiso: ["superadmin", "super_admin"]
  },
  {
    collapse: true,
    path: "/clientes",
    name: "Clientes",
    state: "openCliente",
    icon: "nc-icon nc-single-02",
    permiso: ["superadmin", "super_admin"],
    views: [
      {
        path: "/usuarios",
        layout: "/admin",
        name: "Usuarios",
        mini: "*",
        component: UsersView,
        permiso: ["superadmin", "super_admin"]
      },
   
      {
        path: "/suscritor",
        layout: "/admin",
        name: "Suscriptores",
        mini: "*",
        component: SuscritorViews,
        permiso: ["superadmin", "super_admin"]
      },
      
      {
        path: "/notificacion",
        layout: "/admin",
        name: "Notificaciones Email",
        mini: "*",
        component: UsersView,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/whatsapp",
        layout: "/admin",
        name: "Notificaciones Whatsapp",
        mini: "*",
        component: ReactTables,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Push",
        layout: "/admin",
        name: "Notificaciones Push",
        mini: "*",
        component: ReactTables,
        permiso: ["superadmin", "super_admin"]
      }
    ]
  },
  {
    collapse: true,
    path: "/finanza",
    name: "Finanzas",
    state: "openFinanzas",
    icon: "nc-icon nc-money-coins",
    permiso: ["superadmin", "super_admin"],
    views: [
      {
        path: "/Tickets",
        layout: "/admin",
        name: "Tickets",
        mini: "*",
        component: Ticket,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Facturas",
        layout: "/admin",
        name: "Facturas Electronicas",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Otros",
        layout: "/admin",
        name: "Otros Ingresos & Egresos",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Estadistica",
        layout: "/admin",
        name: "Estadisticas",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      }
    ]
  },{
    collapse: true,
    path: "/Ventas",
    name: "Ventas",
    state: "openVentas",
    icon: "nc-icon nc-cart-simple",
    permiso: ["superadmin", "super_admin"],
    views: [
      {
        path: "/Vender-Tickets",
        layout: "/admin",
        name: "Vender Tickets",
        mini: "*",
        component: Ticket,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Vender-Articulo",
        layout: "/admin",
        name: "Vender Articulo",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Peronalizaciones",
        layout: "/admin",
        name: "Peronalizaciones",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      }
    ]
  },
  {
    path: "/Ajustes",
    layout: "/admin",
    name: "Ajustes",
    icon: "nc-icon nc-settings-gear-64",
    component: AjustesView,
    permiso: ["superadmin", "super_admin"]
    
  },
  {
    path:"/Pruebamapa",
    layout:"/admin",
    name:"Prueba",
    component:EsquemaViews,
    permiso:["",""]
  }
  
  
 
 
  
];
export default routes;
