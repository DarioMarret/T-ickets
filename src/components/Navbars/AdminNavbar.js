import React from "react";
import { useLocation,useHistory } from "react-router";
import { removeDatosUsuario } from "utils/DatosUsuarioLocalStorag";
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { buscarcliente } from "utils/Querypanelsigui";
import { useDispatch } from "react-redux";

function AdminNavbar() {
  let location = useLocation();
  let history =useHistory();
  let usedispatch= useDispatch()
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  function salir(){
    //let usehistory = use
    //162
    //882
    //404
    removeDatosUsuario()
    history.push("/")
  }

  const filterNames = async (e) => {
    e.preventDefault();
    let nombre = $('#cedulac').val()
    
    if (nombre.trim().length >= 4) {
      let informacion = {
        "cedula": !isNaN(nombre.trim()) ? nombre.trim() : '',
        "email": isNaN(nombre.trim()) ? nombre.trim() : ''
      }
      history.push("/admin")
      buscarcliente({ ...informacion }).then(oupt => {
        //console.log(informacion, oupt)
        $("#search").removeClass("d-none")
        if (oupt.data.nombreCompleto != undefined && oupt.data.nombreCompleto != null) {
          $('#cedulac').val("")
          sessionStorage.setItem("Suscritorid", JSON.stringify(oupt.data))
          history.push("/admin/suscritor/" + oupt.data.id + "")
          /*setDausuario({
            nombreCompleto: oupt.data.nombreCompleto,
            ciudad: oupt.data.direccion,
            email: oupt.data.email,
            id: oupt.data.cedula
          })*/
        }
        else {
        
          usedispatch(setToastes({
            show: true,
            message: 'Para ceder un ticket el usuario debe estar registrado',
            color: 'bg-danger', estado: 'Usuaario no encontraron'
          }))
        }

      }

      ).catch(err => {
        usedispatch(setToastes({
          show: true,
          message: 'Usuario no encontrado ',
          color: 'bg-danger', estado: 'Hubo un error'
        }))
        console.log(err)
      })

    }else{
      usedispatch(setToastes({
        show: true,
        message: 'Debe ser mayor a 10 dígito ',
        color: 'bg-warning', estado: 'Atentos'
      }))
    }
  }
  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <Button
                className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
                variant="dark"
                onClick={() => document.body.classList.toggle("sidebar-mini")}
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
              <Button
                className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
                variant="dark"
                onClick={() =>
                  document.documentElement.classList.toggle("nav-open")
                }
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
            </div>
            <Navbar.Brand className="text-uppercase" href="#pablo" onClick={(e) => e.preventDefault()}>
              {location.pathname ?location.pathname.split("/")[2] :''}
            </Navbar.Brand>
          </div>
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            onClick={() => setCollapseOpen(!collapseOpen)}
          >
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </button>
          <Navbar.Collapse className="justify-content-end" in={collapseOpen}>
            <Nav className="nav mrl-auto" navbar>
              
                <InputGroup>
                  
                  <input
                    className=""
                    style={{
                      borderColor:"#e2e2e2",
                      borderWidth:"0.5px",
                      borderTopLeftRadius:"8px",
                      borderBottomLeftRadius:"8px",
                      padding:"3px"
                      
                    }}
                    placeholder="cédula o correo..."
                  id="cedulac"
                    type="text"
                  ></input>
                  <button 
                  className="btn  btn-default"
                    onClick={(e)=>filterNames(e)}
                  ><i className="nc-icon nc-zoom-split mx-1"></i></button>
                  
                </InputGroup>
              
              </Nav>
            <Nav navbar>
              <Dropdown >
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-165516306"
                  variant="default"
                  className="d-none"
                >
                  <i className="nc-icon nc-planet"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                   align="end"
                
                >
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Create New Post
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Manage Something
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Do Nothing
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Submit to live
                  </Dropdown.Item>
                  <li className="divider"></li>
                  <Dropdown.Item
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown >
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-414718872"
                  variant="default"
                  className="d-none"
                >
                  <i className="nc-icon nc-bell-55 mr-1"></i>
                  <span className="notification">5</span>
                  <span className="d-lg-none">Notification</span>
                </Dropdown.Toggle>
                <Dropdown.Menu                 
                   align="end" 
                >
                  <Dropdown.Item
                  >
                    Notification 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    
                  >
                    Notification 2
                  </Dropdown.Item>
                  <Dropdown.Item
                  
                  >
                    Notification 3
                  </Dropdown.Item>
                  <Dropdown.Item
                    
                  >
                    Notification 4
                  </Dropdown.Item>
                  <Dropdown.Item
                  
                  >
                    Notification 5
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown >
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-41471887333"
                  variant="default"
                >
                  <i className="nc-icon nc-bullet-list-67"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                >
                  
                  
                  <Dropdown.Item
                    
                    onClick={(e) => e.preventDefault()}
                    className="d-none"
                  >
                    <i className="nc-icon nc-settings-90"></i>
                    Settings
                  </Dropdown.Item>
                  <div className="divider"></div>
                
                  <Dropdown.Item
                    className="text-danger"
                    
                    onClick={() => salir()}
                  >
                    <i className="nc-icon nc-button-power"></i>
                    Salir
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
