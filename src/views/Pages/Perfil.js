import React from "react";

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

function PerfilPage() {
  return (
    <>
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col md="8" sm="6">
              
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">DATOS PERSONALES </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                    <Row>
                    <Col className="p-2" md="12">
                          <Form.Group>
                            <label>Nombres</label>
                            <Form.Control                              
                              placeholder="Username"
                              name="nombre"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                    </Row>
                      <Row>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label>Cédula </label>
                            <Form.Control                            
                              disabled
                              placeholder=""
                              name="cedula"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Correos
                            </label>
                            <Form.Control
                              disabled
                              placeholder=""
                              name="correo"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                       
                       
                      </Row>
                      <Row>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label>Whatsapp </label>
                            <Form.Control
                              name="whatsapp"
                              placeholder=""
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1 pl-1" md="6">
                          <Form.Group>
                            <label>Dirección</label>
                            <Form.Control
                            name="direccion"
                              placeholder=""
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>                                        
                      <Row>
                        <Col md="6" className="pr-1 pl-1">
                          <Form.Group>
                            <label>Fecha de nacimiento</label>
                            <Form.Control
                            name="fecha"
                              type="date"                             
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1 pl-1" md="6">
                        <Form.Group>
                            <label>Edad</label>
                            <Form.Control
                            disabled
                            name="edad"
                              type="text"                             
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <button
                        className="btn-fill pull-right btn btn-success"     
                             
                      >
                       Actualizar
                      </button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
               
              </Col>
              <Col md="4">
              
                  <Card>
                    <Card.Header>
                     CAMBIAR CONTRASEÑA
                    </Card.Header>
                    <Card.Body>
                    <Row>
                        <Col className="pr-1 pl-1" md="12">
                          <Form.Group>
                            <label>Contraseña Actual</label>
                            <Form.Control
                              name="contraseña"
                              placeholder=""
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pr-1 pl-1" md="12">
                          <Form.Group>
                            <label>Nueva Contraseña</label>
                            <Form.Control
                              name="newcontraseña"
                              placeholder=""
                              type="password"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                    </Row>
                    <button className="btn-fill pull-right btn btn-success">
                       Actualizar
                    </button>
                      <div className="clearfix"></div>
                     
                    </Card.Body>

                  </Card>
               

              </Col>
              {/*<Col md="4">
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
                      <a href="#pablo" className=" nav-link" onClick={(e) => e.preventDefault()}>
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
              </Col>*/}
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default PerfilPage;
