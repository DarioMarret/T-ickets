import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Subcr from "layouts/Subsc";
import Indexflas from "../src/views/Pages/Flasdeticket"
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    <Switch>
      
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/panel" render={(props)=> <Subcr {...props}/> }/>
      <Route path="/flastick" render={()=><Indexflas/>}/>
    
      <Redirect from="/" to="/flastick"  />
      <Route path="*" to="/" />
    </Switch>
  </BrowserRouter>
);
