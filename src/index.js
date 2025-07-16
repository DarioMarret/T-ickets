import React, { lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { checkLocalStorageExpiration, clienteInfo } from "utils/DatosUsuarioLocalStorag";
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
import Compras from 'Pages/Compras/index'
import "./utils/tablas.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import Loadable from "views/Components/Loadable/index";
import BingoViewtiparamsasb from "views/Pages/Suscriptores/Bingoparamsabs";
import ResestPassword from "views/Pages/Susbcritorpage/Passwor";
import LoginPage from "views/Pages/LoginPage";
const AuthLayout = Loadable(lazy(() => import("layouts/Auth.js")))
const AdminLayout = Loadable(lazy(() => import("layouts/Admin.js")))
const Indexflas = Loadable(lazy(() => import("../src/views/Pages/Flasdeticket")))

const Ventasnuevas = Loadable(lazy(() => import("views/Pages/VenderTiket.js/Ventas/index")))
const root = ReactDOM.createRoot(document.getElementById("root"));
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

function ExternalRedirect(e) {
  console.log(e)
  window.location.href = `https://api.whatsapp.com/send?phone=593980008000&text=${e.e}`;
  return null; // No renderiza nada
}
function ElementoDicho() {
  let dato = window.location.protocol + "//" + window.location.host + "/admin";
  window.location.href = dato;
  return null;


}



root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth" element={<Navigate to="/admin" replace />} />

        
        <Route
          path="/admin/*"
          element={ <AdminLayout />}
        >
          
        </Route>
        <Route
          path="/compra/*"
          element={<Compras />}
        />
        <Route path="/bingo/:id" element={<BingoViewtiparamsasb />} />
        <Route path="/password/:id" element={<ResestPassword />} />
        <Route
          path="/Jessi"
          element={<ExternalRedirect e="Quiero participar en el concurso de Jessi Uribe" />}
        />
        <Route
          path="/Mofle"
          element={<ExternalRedirect e="Quiero comprar boletos para el show de La Mofle" />}
        />
        <Route path="/" element={<Indexflas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    <ToastViews />
  </Provider>
);
