/*!

=========================================================
* Light Bootstrap Dashboard PRO React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import UserPage from "views/Pages/UserPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import PerfilPage from "views/Pages/Perfil";
*/
import Dashboard from "views/Dashboard.js";
import Ticket from "views/Pages/Tickets.js";
import Ventas from "views/Pages/VenderTiket.js"
import Espacios from "views/Pages/Espacios";
import Eventos from "views/Pages/Evento";
import EventoEspecifico from "views/Pages/Evento/MODAL/Evetoespecifico";
import DiseñoViwpdf from "views/Pages/Diseñador/Diseñopdf.js";
import AutorizacionView from "views/Pages/Autorizacion";
import Reactabla from "views/Pages/Susbcritorpage/Tickes.js";
import ReactTables from "views/Tables/ReactTables.js";
import SuscritorViews from "views/Pages/Suscriptores";
import UsersView from "views/Pages/Usuarios";
import SuscritoridView from "views/Pages/Suscriptores/Suscritorid";
import UseridView from "views/Pages/Usuarios/Usuarioid";
import Viesvg from "views/Pages/Svgviewa"
import AjustesView from "views/Pages/Ajustes";
import { DiseñoViewtickes } from "views/Pages/Diseñador/Diseñodeticke";
import EsquemaViews from "views/Pages/Esquemas";
import NoticiasJs from "views/Pages/Noticias.js";
import AprobarView from "views/Pages/VenderTiket.js/Aprobar";
import AprobarViewid from "views/Pages/VenderTiket.js/Aprobar/Aprobobarid";
import EmitirboView from "views/Pages/VenderTiket.js/Emitir";
import TagsInput from "components/TagsInput/TagsInput";
import DetalleCompraView from "views/Pages/VenderTiket.js/Aprobar/Detalleregistro";
import InformeView from "views/Pages/VenderTiket.js/Aprobar/Informeventa";

var routes = [
  {
    path: "/Inicio",
    layout: "/admin",
    name: "Inicio",
    icon: "nc-icon nc-layers-3",
    component: Dashboard,
    permiso: ["superadmin", "super_admin", "vendedores","suscriptores"]

  },
  {
    path: "/Noticias",
    name: "Noticias",
    layout: "/admin",
    component: NoticiasJs,
    icon: " nc-icon nc-notification-70", permiso: ["superadmin", "super_admin"],
  },
  {
    path: "/Evento/:id",
    layout: "/admin",
    component: EventoEspecifico,
    permiso: ["superadmin", "super_admin", "vendedores"],
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
        path: "/usuario/:id",
        layout: "/admin",
        component: UseridView,
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
        path: "/Informacion-tributaria",
        layout: "/admin",
        name: "SRI",
        mini: "*",
        component: AutorizacionView,
        permiso: ["superadmin", "super_admin"]
      }, {
        path: "/configurar-comisiones",
        layout: "/admin",
        name: " Comisiones",
        mini: "*",
        component: AutorizacionView,
        permiso: ["superadmin", "super_admin"]
      }
      , {
        path: "/Diseñar-Ticket",
        layout: "/admin",
        name: "Diseñar Ticket",
        mini: "*",
        component: DiseñoViewtickes,
        permiso: ["superadmin", "super_admin"]
      },
      {
        path: "/Diseñar-PDF",
        layout: "/admin",
        name: "Diseñar PDF",
        mini: "*",
        component: DiseñoViwpdf,
        permiso: ["superadmin", "super_admin"]
      }
    ]
  },

  {
    path: "/suscritor/:id",
    state: "openCliente",
    layout: "/admin",

    component: SuscritoridView, permiso: ["superadmin", "super_admin", "vendedores"],
  },
  {
    path: "/Reporte/:id",
    state: "openCliente",
    layout: "/admin",

    component: DetalleCompraView, permiso: ["superadmin", "super_admin", "vendedores"],
  },


  {
    collapse: true,
    path: "/clientes",
    name: "Clientes",
    state: "openCliente",
    icon: "nc-icon nc-single-02",
    permiso: ["superadmin", "super_admin", "vendedores"],
    views: [


      {
        path: "/suscritor",
        layout: "/admin",
        name: "Suscriptores",
        mini: "*",
        component: SuscritorViews,
        permiso: ["superadmin", "super_admin", "vendedores"],
      },


    ]
  },
  {
    collapse: true,
    path: "/Ventas",
    name: "Ventas",
    state: "openVentas",
    icon: "nc-icon nc-cart-simple",
    permiso: ["superadmin", "super_admin", "vendedores", "suscriptores"],
    views: [
      {
        path: "/Vender-Tickets",
        layout: "/admin",
        name: "Vender Tickets",
        mini: "*",
        component: Ventas,
        permiso: ["superadmin", "super_admin", "vendedores"]
      },

      {
        path: "/Aprobar-Ventas",
        layout: "/admin",
        name: "Ventas Por Aprobar",
        mini: "*",
        component: AprobarView,
        permiso: ["superadmin", "super_admin", "vendedores"]
      }, 
      {
        path: "/Informe",
        layout: "/admin",
        name: "Informe",
        mini: "*",
        component: InformeView,
        permiso: ["suscriptores"]
      }, 
      {
        path: "/Aprobar/:id",
        layout: "/admin",
       
        component: AprobarViewid,
        permiso: ["superadmin", "super_admin", "vendedores"]
      }, 
      {
        path:"/Boletos",
        layout:"/admin",
        mini:"*",
        name:"Boletos",
        component: EmitirboView,
        permiso: ["superadmin", "super_admin", "vendedores"]
      },
      {
        path: "/Vender-Articulo",
        layout: "/admin",
        name: "Vender Articulo",
        mini: "*",
        component: EmitirboView,
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
    permiso: ["", "", ""],
    views: [
      {
        path: "/Tickets",
        layout: "/admin",
        name: "Tickets",
        mini: "*",
        component: Ticket,
        permiso: ["superadmin", "super_admin", "vendedores"],
      },
      {
        path: "/Facturas",
        layout: "/admin",
        name: "Facturas Electronicas",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin", "vendedores"],
      },
      {
        path: "/Otros",
        layout: "/admin",
        name: "Otros Ingresos & Egresos",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin",],
      },
      {
        path: "/Estadistica",
        layout: "/admin",
        name: "Estadisticas",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin", "vendedores"],
      }
    ]
  },
  {
    collapse: true,
    path: "/Mensaeria",
    name: "Mensajeria",
    state: "openMensajeria",
    icon: "nc-icon nc-money-coins",
    permiso: ["superadmin", "super_admin"],
    views: [
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
    path: "/Ajustes",
    name: "Ajustes",
    icon: "nc-icon nc-settings-gear-64",
    state: "openAjustes",
    permiso: ["superadmin", "super_admin"],
    views: [
      {
        path: "/Gestion-Personal",
        layout: "/admin",
        name: "Gestión Personal",
        mini: "*",
        component: UsersView,
        permiso: ["superadmin", "super_admin"]
      },

      {
        path: "/Pasarela-Pago",
        layout: "/admin",
        name: "Pasarela de Pago",
        mini: "*",
        component: Ventas,
        permiso: ["superadmin", "super_admin"]
      }, {
        path: "/Servidor-Correo",
        layout: "/admin",
        name: "Servidor de Correo",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      }, {
        path: "/Servidor-Correo",
        layout: "/admin",
        name: "Configurar WhatsApp",
        mini: "*",
        component: Reactabla,
        permiso: ["superadmin", "super_admin"]
      }
    ]
  },

  {
    path: "/Pruebaticke",
    layout: "/admin",
    name: "Prueba",
    component: EsquemaViews,
    permiso: ["", ""]
  },
  {
    path: "/Pruebasvg",
    layout: "/admin",
    name: "PruSvgeba",
    component: Viesvg,
    permiso: ["super_admin", "", ""]
  }





];
export default routes;
