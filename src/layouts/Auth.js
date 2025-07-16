import React from "react";
import { Routes, Route } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

// dinamically create auth routes
import routes from "routes.js";

function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={ prop.path}
            key={"aut"+key}
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
      <div className=" wrapper-full-page">
        {/* Navbar
           <AuthNavbar />
         */}
       
        {/* End Navbar */}
        <Routes>{getRoutes(routes)}</Routes>
       {/* <AuthFooter />*/}
      </div>

    </>
  );
}

export default Auth;
