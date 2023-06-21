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
import AutorizacionView from "views/Pages/Autorizacion";
import Reactabla from "views/Pages/Susbcritorpage/Tickes.js";
import SuscritorViews from "views/Pages/Suscriptores";
import UsersView from "views/Pages/Usuarios";
import SuscritoridView from "views/Pages/Suscriptores/Suscritorid";
import UseridView from "views/Pages/Usuarios/Usuarioid";
import Viesvg from "views/Pages/Svgviewa"
import EsquemaViews from "views/Pages/Esquemas";
import NoticiasJs from "views/Pages/Noticias.js";
import AprobarView from "views/Pages/VenderTiket.js/Aprobar";
import AprobarViewid from "views/Pages/VenderTiket.js/Aprobar/Aprobobarid";
import EmitirboView from "views/Pages/VenderTiket.js/Emitir";
import DetalleCompraView from "views/Pages/VenderTiket.js/Aprobar/Detalleregistro";
import ConsolidacionView from "views/Pages/Consolidados/index.js";

var routes = [
  {
    path: "/Inicio",
    layout: "/admin",
    name: "Inicio",
    icon: "nc-icon nc-layers-3",
    component: Dashboard,
    permiso: ["1", "super_admin", "vendedores", "suscriptores"]

  },
  {
    path: "/Noticias",
    name: "Noticias",
    layout: "/admin",
    component: NoticiasJs,
    icon: " nc-icon nc-notification-70", permiso: ["1", ],
  },
  {
    path: "/Evento/:id",
    layout: "/admin",
    component: EventoEspecifico,
    permiso: ["1",  "vendedores"],
  },
  {
    collapse: true,
    path: "/Getion",
    name: "Gestion de Eventos",
    state: "openGestion",
    icon: "nc-icon nc-notes",
    permiso: ["1", ],
    views: [
      {
        path: "/Espacio",
        layout: "/admin",
        name: "Crear Espacio",
        mini: "*",
        component: Espacios,
        permiso: ["1", ]
      },
      {
        path: "/usuario/:id",
        layout: "/admin",
        component: UseridView,
        permiso: ["1", ]
      },
      {
        path: "/Informacion-tributaria",
        layout: "/admin",
        name: "Promotor",
        mini: "*",
        component: AutorizacionView,
        permiso: ["1",]
      }, 
      {
        path: "/Evento",
        layout: "/admin",
        name: "Evento",
        mini: "*",
        component: Eventos,
        permiso: ["1", ]
      },
      {
        path: "/configurar-comisiones",
        layout: "/admin",
        name: " Comisiones",
        mini: "*",
        component: AutorizacionView,
        permiso: ["", ]
      }
     
    ]
  },

  {
    path: "/suscritor/:id",
    state: "openCliente",
    layout: "/admin",

    component: SuscritoridView, permiso: ["1", "super_admin", ],
  },
  {
    path: "/Reporte/:id",
    state: "openCliente",
    layout: "/admin",

    component: DetalleCompraView, permiso: ["1", "suscriptores","super_admin", ],
  },


  {
    collapse: true,
    path: "/clientes",
    name: "Clientes",
    state: "openCliente",
    icon: "nc-icon nc-single-02",
    permiso: ["1"],
    views: [
      {
        path: "/suscritor",
        layout: "/admin",
        name: "Suscriptores",
        mini: "*",
        component: SuscritorViews,
        permiso: ["1", "super_admin", ],
      },


    ]
  },
  {
    collapse: true,
    path: "/Ventas",
    name: "Ventas",
    state: "openVentas",
    icon: "nc-icon nc-cart-simple",
    permiso: ["1"],
    views: [
      {
        path: "/Vender-Tickets",
        layout: "/admin",
        name: "Vender Tickets",
        mini: "*",
        component: Ventas,
        permiso: ["1", "super_admin", "vendedores"]
      },

      {
        path: "/Aprobar-Ventas",
        layout: "/admin",
        name: "Ventas Por Aprobar",
        mini: "*",
        component: AprobarView,
        permiso: ["1", "super_admin", ]
      },
      {
        path:"/Consolidados",
        layout:"/admin",
        name:"Consolidados",
        mini:"*",
        component:ConsolidacionView,
        permiso: []
      },/*
      {
        path: "/Informe",
        layout: "/admin",
        name: "Informe de ventas",
        mini: "*",
        component: InformeView,
        permiso: ["suscriptores", "1", "super_admin", "vendedores"]
      },*/
      {
        path: "/Aprobar/:id",
        layout: "/admin",

        component: AprobarViewid,
        permiso: ["1", "super_admin", ]
      },
      {
        path: "/Boletos",
        layout: "/admin",
        mini: "*",
        name: "Boletos",
        component: EmitirboView,
        permiso: ["1", "super_admin", ]
      },
      {
        path: "/Vender-Articulo",
        layout: "/admin",
        name: "Vender Articulo",
        mini: "*",
        component: EmitirboView,
        permiso: ["1", ]
      }

    ]
  },
  {
    collapse: true,
    path: "/finanza",
    name: "Finanzas",
    state: "openFinanzas",
    icon: "nc-icon nc-money-coins",
    permiso: [""],
    views: [
      {
        path: "/Tickets",
        layout: "/admin",
        name: "Tickets",
        mini: "*",
        component: Ticket,
        permiso: ["1", "super_admin", "vendedores"],
      },
      {
        path: "/Facturas",
        layout: "/admin",
        name: "Facturas Electronicas",
        mini: "*",
        component: Reactabla,
        permiso: ["1", "super_admin", "vendedores"],
      },
      {
        path: "/Otros",
        layout: "/admin",
        name: "Otros Ingresos & Egresos",
        mini: "*",
        component: Reactabla,
        permiso: ["1", "super_admin",],
      },
      {
        path: "/Estadistica",
        layout: "/admin",
        name: "Estadisticas",
        mini: "*",
        component: Reactabla,
        permiso: ["1", "super_admin", "vendedores"],
      }
    ]
  },
  {
    collapse: true,
    path: "/Mensaeria",
    name: "Mensajeria",
    state: "openMensajeria",
    icon: "nc-icon nc-money-coins",
    permiso: [ ],
    views: [
      {
        path: "/notificacion",
        layout: "/admin",
        name: "Notificaciones Email",
        mini: "*",
        component: UsersView,
        permiso: ["1", "super_admin"]
      },
      {
        path: "/whatsapp",
        layout: "/admin",
        name: "Notificaciones Whatsapp",
        mini: "*",
        component: UsersView,
        permiso: ["1", "super_admin"]
      },
      {
        path: "/Push",
        layout: "/admin",
        name: "Notificaciones Push",
        mini: "*",
        component: UsersView,
        permiso: ["1", "super_admin"]
      }
    ]

  },
  {
    collapse: true,
    path: "/Ajustes",
    name: "Ajustes",
    icon: "nc-icon nc-settings-gear-64",
    state: "openAjustes",
    permiso: ["1", "super_admin"],
    views: [
      {
        path: "/Gestion-Personal",
        layout: "/admin",
        name: "Gestión Personal",
        mini: "*",
        component: UsersView,
        permiso: ["1", "super_admin"]
      },

      {
        path: "/Pasarela-Pago",
        layout: "/admin",
        name: "Pasarela de Pago",
        mini: "*",
        component: Ventas,
        permiso: ["1", "super_admin"]
      }, {
        path: "/Servidor-Correo",
        layout: "/admin",
        name: "Servidor de Correo",
        mini: "*",
        component: UsersView,
        permiso: ["1", "super_admin"]
      }, {
        path: "/Servidor-Correo",
        layout: "/admin",
        name: "Configurar WhatsApp",
        mini: "*",
        component: UsersView,
        permiso: ["1", "super_admin"]
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
    permiso: ["", "", ""]
  }





];
export default routes;
