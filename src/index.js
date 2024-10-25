import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {  clienteInfo } from "utils/DatosUsuarioLocalStorag";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/css/bundle";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";

import "views/Components/MODAL/localidas.css"
import "views/Pages/Svgviewa/isvg.css"
import "views/Pages/Svgviewa/class.css"
import "views/Pages/Svgviewa/svg.css"
import "views/Pages/Svgviewa/cultura.css"

//import Indexflas from "../src/views/Pages/Flasdeticket"
import { store } from "StoreRedux/store";
import { Provider } from 'react-redux';
import ToastViews from "views/Components/TOAST/toast";
import "./utils/tablas.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import Loadable from "views/Components/Loadable/index";
import BingoViewtiparamsasb from "views/Pages/Suscriptores/Bingoparamsabs";
import ResestPassword from "views/Pages/Susbcritorpage/Passwor";
const AuthLayout = Loadable(lazy(() => import("layouts/Auth.js")))
const AdminLayout = Loadable(lazy(() => import("layouts/Admin.js")))
const Indexflas = Loadable(lazy(() => import("../src/views/Pages/Flasdeticket")))
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => !clienteInfo() ? <AuthLayout {...props} /> : <Redirect from="/" to="/admin/inicio" />} />
        <Route path="/admin" render={(props) => clienteInfo() ? <AdminLayout {...props} /> : <Redirect from="/" to="/auth/login" />} />
        <Route path="/bingo/:id" render={()=><BingoViewtiparamsasb/> } />
        <Route path="/password/:id" render={()=><ResestPassword/>}/>

        {/*<Route path="/localidad/:id/:parms" render={() => <LocalidadMApView />} />*/}
        <Route path="/" render={() => <Indexflas /> } />

        <Route path="*" to="/" />
        <Route path="*" to="/" />
      </Switch>
    </BrowserRouter>
    <ToastViews />
  </Provider>
);
