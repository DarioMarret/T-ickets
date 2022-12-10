import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { getCliente, clienteInfo } from "utils/DatosUsuarioLocalStorag";
import ViewToas from "views/Components/TOAST";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/css/bundle";
//import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Subcr from "layouts/Subsc";
import Indexflas from "../src/views/Pages/Flasdeticket"
import { store } from "StoreRedux/store";
import { Provider } from 'react-redux';
import ToastViews from "views/Components/TOAST/toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
/*<Route path="/panel" render={(props)=> <Subcr {...props}/> }/>*/


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={(props) => !clienteInfo() ? <AuthLayout {...props} /> : <Redirect from="/" to="/admin/inicio" />} />
        <Route path="/admin" render={(props) => clienteInfo() ? <AdminLayout {...props} /> : <Redirect from="/" to="/auth/login" />} />
        <Route path="/ticket" render={() => <Indexflas />} />
        <Redirect from="/" to="/ticket" />
        <Route path="*" to="/" />
      </Switch>
    </BrowserRouter>
    <div role="alert" aria-live="assertive" aria-atomic="true" className="toast" data-autohide="false"
      style={{
        position: "fixed",
        zIndex: 10000,
      }}

    >
      <div className="toast-header">
        <img src="..." className="rounded mr-2" alt="..." />
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>
    <ToastViews />
  </Provider>
);
