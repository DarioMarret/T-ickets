import React, { useEffect, useState } from "react";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { CancelarSubscriptor } from "utils/Querypanel";

import SweetAlert from 'react-bootstrap-sweetalert';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";


function UserPage() {
  let user= clienteInfo()
  const [alert,setAlert] = React.useState(null)
  const [datos,setDatosUser]=useState({
    id: '', 
    username:'', 
    name: '', 
    email: '', 
    perfil: ''
      })

      async function Eliminasucrito(){
        try {
          if(datos.email!=''){
          const cancelar = await CancelarSubscriptor(datos.email)
          const {success}=cancelar
          if(success){

          localStorage.removeItem(DatosUsuarioLocalStorang)
          location.reload()
        }
        }
        } catch (error) {
          
        }

      }
     function handelchange(){
      setDatosUser({
        ...datos,
        [e.name]:e.value,
      })
     } 
     const successAlert = (e) => {
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Estas Seguro?"
          onConfirm={() => Eliminasucrito()}
          onCancel={() => cancelDetele()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          showCancel
        >
          Esta seguro de cancelar su suscripción 
        </SweetAlert>
      );
    };
    const successDelete = () => {
      setAlert(
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Eliminado!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
        >
          El suscritor se elimino correctamenta
        </SweetAlert>
      );
    };
    const cancelDetele = () => {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelado"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
        >
         Se a cancelado la acción 
        </SweetAlert>
      );
    };
    const hideAlert = () => {
      setAlert(null);
    };
      useEffect(()=>{
        console.log(user)
        setDatosUser(user)
      },[])
  return (
    <>
      <Container fluid>
      {alert}
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row className="d-flex flex-wrap-reverse ">
              <Col md="8" sm="12">
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">Edit Profile</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>Nombre</label>
                            <Form.Control
                             value={datos.name}
                             onChange={(e)=>handelchange(e.target)}
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="3">
                          <Form.Group>
                            <label>Username</label>
                            <Form.Control
                              
                              placeholder="Username"
                              value={datos.username}
                              onChange={(e)=>handelchange(e.target)}
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Form.Control
                              placeholder="Email"
                              type="email"
                              value={datos.email}
                              onChange={(e)=>handelchange(e.target)}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>First Name</label>
                            <Form.Control
                              defaultValue="Mike"
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Last Name</label>
                            <Form.Control
                              defaultValue="Andrew"
                              placeholder="Last Name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Address</label>
                            <Form.Control
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              placeholder="Home Address"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              defaultValue="Mike"
                              placeholder="City"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue="Andrew"
                              placeholder="Country"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>Postal Code</label>
                            <Form.Control
                              placeholder="ZIP Code"
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              cols="80"
                              defaultValue="Mike"
                              placeholder="Here can be your description"
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Update Profile
                      </Button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                      <img
                        alt="..."
                        src={require("assets/img/full-screen-image-3.jpg")}
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" className="nav-link" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/default-avatar.png")}
                        ></img>
                        <Card.Title as="h5">Tania Keatley</Card.Title>
                      </a>
                      <p className="card-description">michael24</p>
                    </div>
                    <p className="card-description text-center">
                      Hey there! As you can see, <br></br>
                      it is already looking great.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="button-container text-center">
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-facebook-square"></i>
                      </Button>
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button
                        className="btn-simple btn-icon"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        variant="link"
                      >
                        <i className="fab fa-google-plus-square"></i>
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default UserPage;
