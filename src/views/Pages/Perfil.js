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
                <Form action="" className="form" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">Datos de usuario </Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                    <Row>
                    <Col className="pr-1" md="12">
                          <Form.Group>
                            <label>Nombres</label>
                            <Form.Control
                              defaultValue="michael23"
                              placeholder="Username"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                    </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Cedula </label>
                            <Form.Control
                              defaultValue="Creative Code Inc."
                              disabled
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Correos
                            </label>
                            <Form.Control
                              placeholder="Email"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                       
                       
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>Whatsapp </label>
                            <Form.Control
                              defaultValue="Mike"
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Direccion</label>
                            <Form.Control
                              defaultValue="Andrew"
                              placeholder="Last Name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                       
                      </Row>
                      <Row>
                        
                        
                      
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Fecha de nacimiento</label>
                            <Form.Control
                              cols="80"
                              type="date"
                             
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btn-fill pull-right"
                       
                        variant="success"
                      >
                       Actualizar
                      </Button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
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
