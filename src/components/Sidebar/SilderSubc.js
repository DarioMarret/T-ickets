import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import imagen5 from "assets/imagen/logo-tickets.png"
 //import {clienteInfo} from "../../utils" ;
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col
} from "react-bootstrap";

function SuscritSidebar({ routes, image, background }) {
  // to check for active links and opened collapses
  /*const [user, setuser] = React.useState(() => {
    const user = clienteInfo()
    const parse = JSON.parse(user);
    return parse || "no user";
})*/
const usuario ="admin";
  let location = useLocation();
  // this is for the user collapse
  const [userCollapseState, setUserCollapseState] = React.useState(false);
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    setState(getCollapseStates(routes));
  }, []);
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes prop
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname === routes[i].layout + routes[i].path) {
        return true;
      }
    }
    return false;
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  //aqui puedo validar lo navitem que quiero que se rendericen 
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
     // console.log(prop.permiso.every(e=>e!="admin"))
      
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <Nav.Item
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            as="li"
            key={key}
          >
            <Nav.Link
              className={state[prop.state] ? "collapsed" : ""}
              data-toggle="collapse"
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, ...st });
              }}
              aria-expanded={state[prop.state]}
            >
              <i className={prop.icon}></i>
              <p>
                {prop.name} <b className="caret"></b>
              </p>
            </Nav.Link>
            <Collapse in={state[prop.state]}>
              <div>
                <Nav as="ul">{createLinks(prop.views)}</Nav>
              </div>
            </Collapse>
          </Nav.Item>
        );
      }
      return (
        <Nav.Item
          className={activeRoute(prop.layout + prop.path)}
          key={key}
          as="li"
        >
          <Nav.Link to={prop.layout + prop.path} as={Link}>
            {prop.icon ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  return (
    <>
      <div className="sidebar" data-color={background} data-image={image}>
        <div className="sidebar-wrapper">
          <div className="logo">
            <a
              className="simple-text logo-mini nav-link"
             
            >
              <div className="logo-img">
                
              </div>
            </a>
            <a
              className="simple-text logo-normal nav-link"
              
            >
              <img
                  src={imagen5}
                  alt="react-logo"
                  style={{height:'60px',width:'auto'}}
                />
            </a>
          </div>
          <div className="user">
            <div className="photo">
              {/*<img alt="..." src={require("assets/img/default-avatar.png")} />*/}
            </div>
            <div className="info">
              <a
                className={userCollapseState ? "collapsed nav-link px-1" : " nav-link  px-1"}
                data-toggle="collapse"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setUserCollapseState(!userCollapseState);
                }}
               
              >
                <span>
                Nombre del usuario 
                </span>
              </a>
              
            </div>
          </div>
          <Nav as="ul">{createLinks(routes)}</Nav>
        </div>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: "url('" + image + "')"
          }}
        ></div>
      </div>
    </>
  );
}

let linkPropTypes = {
  path: PropTypes.string,
  layout: PropTypes.string,
  name: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
};

SuscritSidebar.defaultProps = {
  image: "",
  background: "black",
  routes: []
};

SuscritSidebar.propTypes = {
  image: PropTypes.string,
  background: PropTypes.oneOf([
    "black",
    "azure",
    "green",
    "orange",
    "red",
    "purple"
  ]),
  routes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        ...linkPropTypes,
        icon: PropTypes.string
      }),
      PropTypes.shape({
        collapse: true,
        path: PropTypes.string,
        name: PropTypes.string,
        state: PropTypes.string,
        icon: PropTypes.string,
        views: PropTypes.shape({
          ...linkPropTypes,
          mini: PropTypes.string
        })
      })
    ])
  )
};

export default SuscritSidebar;
