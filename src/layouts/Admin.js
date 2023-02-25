import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// react-bootstrap components
import "../assets/css/animate.css";
import "../assets/css/bootstrap.css";
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import SubcritorNavbar from "components/Navbars/SubcritoNavbar";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import routes from "routesub.js"
// dinamically create dashboard routes
//import routes from "routes.js";
//import routes from "routesinicial
import image1 from "assets/img/full-screen-image-1.jpg";
import image2 from "assets/img/full-screen-image-2.jpg";
import image3 from "assets/img/full-screen-image-3.jpg";
import image4 from "assets/img/full-screen-image-4.jpg";
import ToastViews from "views/Components/TOAST/toast";
import { useEffect } from "react";

function Admin() {
  let user = clienteInfo()
  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("black");
  const getRoutes = (routes) => {
  
    return routes.map((prop, key) => {
      if (prop.permiso != null && prop.permiso.every(e => e != user.perfil)) {
        return null
      }
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
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
  useEffect(()=>{
    
  },[])
  return (
    <>
      <div className="wrapper">
        <Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}

        />
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <Switch>
              {getRoutes(routes)}
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
      {/*<FixedPlugin
        setSidebarImageParent={(value) => setSidebarImage(value)}
        sidebarDefaultImage={sidebarImage}
        sidebarImages={[image1, image2, image3, image4]}
        backgroundColors={[
          "black",
          "azure",
          "green",
          "orange",
          "red",
          "purple",
        ]}
        backgroundColor={sidebarBackground}
        setSidebarBackgroundParent={(value) => setSidebarBackground(value)}
      />*/}

    </>
  );
}

export default Admin;
