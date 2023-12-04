import React, { lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { getCliente, clienteInfo } from "utils/DatosUsuarioLocalStorag";
import ViewToas from "views/Components/TOAST";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/css/bundle";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Subcr from "layouts/Subsc";
const Indexflas = Loadable(lazy(() => import("../src/views/Pages/Flasdeticket")))
//import Indexflas from "../src/views/Pages/Flasdeticket"
import { store } from "StoreRedux/store";
import { Provider } from 'react-redux';
import ToastViews from "views/Components/TOAST/toast";
import "./utils/tablas.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import Loadable from "views/Components/Loadable/index";
import BingoViewtiparams from "views/Pages/Suscriptores/Bingoparams";
const root = ReactDOM.createRoot(document.getElementById("root"));
/*<Route path="/panel" render={(props)=> <Subcr {...props}/> }/>*/


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => !clienteInfo() ? <AuthLayout {...props} /> : <Redirect from="/" to="/admin/inicio" />} />
        <Route path="/admin" render={(props) => clienteInfo() ? <AdminLayout {...props} /> : <Redirect from="/" to="/auth/login" />} />
        <Route path="/bingo/:id" render={()=><BingoViewtiparams/>} />
        <Route path="/" render={() => <Indexflas /> } />
        <Route path="*" to="/" />
      </Switch>
    </BrowserRouter>
    <ToastViews />
  </Provider>
);
