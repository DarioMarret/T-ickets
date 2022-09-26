import React from "react";
import { Switch, Route,Redirect } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import Sildersub from "components/Sidebar/SilderSubc.js"
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import SubcritorNavbar from "components/Navbars/SubcritoNavbar";
import AdminFooter from "components/Footers/AdminFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routesub.js"

// dinamically create dashboard routes
//import routes from "routes.js";
//import routes from "routesinicial
import imagen5 from "assets/imagen/logo-tickets.png"
import image1 from "assets/img/full-screen-image-1.jpg";
import image2 from "assets/img/full-screen-image-2.jpg";
import image3 from "assets/img/full-screen-image-3.jpg";
import image4 from "assets/img/full-screen-image-4.jpg";

function Subcrito() {
  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("black");
  //aqui valido las rutas que deben admitirse segun el permiso
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if(prop.permiso!=null && prop.permiso.every(e=>e!="admin") ){
        return null

      }
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/panel") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="wrapper">
        <Sildersub
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
          
        />
        <div className="main-panel">
          <SubcritorNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}
            <Redirect from="/panel" to="/panel/inicio"  />
            </Switch>
          </div>
          {/*<AdminFooter />*/}
          <div
            className="close-layer"
            onClick={() =>
              document.documentElement.classList.toggle("nav-open")
            }
          />
        </div>
      </div>
      
    </>
  );
}

export default Subcrito;
