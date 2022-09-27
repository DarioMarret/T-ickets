import React, {useEffect,useState} from "react";
import { getCliente } from "utils/DatosUsuarioLocalStorag";
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

function PerfilPage(props) {
  const { datosPerson}=props

  const [datosPersons, setPerson] = useState({
    cedula: '',
    name: '',
    email: '',
    whatsapp: '',
    metodoPago: '',
    envio: '',
    direccion: '',
    edad:'',
    fecha:''
  })
   function handelchange(e){
    setPerson({
      ...datosPersons,
      [e.name]:e.value
    })

   }
  useEffect(()=>{
    setPerson({
      ...datosPerson
    })

  },[datosPerson])
  return (
    <>
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
          <Row>
          <Col lg="3" sm="6" >
            <Card className="card-stats ">
              <Card.Body>
                <Row className="">
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-headphones-2 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Boletos</p>
                      <Card.Title as="h4">0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-music mr-1"></i>
                  Boletos
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-cart-simple text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Compras</p>
                      <Card.Title as="h4">$0</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Total Compras
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                <Col xs="7">
                    <div className="">
                    <Card.Title as="h4">Bienvenido </Card.Title>
                      <p className="card-category"> 
                      {datosPerson? datosPerson.name:''}</p>
                      
                    </div>
                  </Col>
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-satisfied text-danger"></i>
                    </div>
                  </Col>
                 
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock mr-1"></i>
                  Hora de inicio Sección 26/09/2022 19:00
                </div>
              </Card.Footer>
            </Card>
          </Col>
         
        </Row>
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
                              placeholder="name"
                              value={datosPersons.name}
                              onChange={(e)=>handelchange(e.target)}
                              name="name"
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
                              value={datosPersons.cedula}
                              onChange={(e)=>handelchange(e.target)}
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
                              value={datosPersons.email}
                              onChange={(e)=>handelchange(e.target)}
                              placeholder=""
                              name="email"
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
                              value={datosPersons.whatsapp}
                              onChange={(e)=>handelchange(e.target)}
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
                            value={datosPersons.direccion}
                            onChange={(e)=>handelchange(e.target)}
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
                              value={datosPersons.fecha}
                              onChange={(e)=>handelchange(e.target)}
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
                            value={datosPersons.edad}
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
