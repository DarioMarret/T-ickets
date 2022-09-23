import React ,{useEffect,useState}from "react";
import { Card,Col,Row ,Modal } from "react-bootstrap";
import ModalNewEvento from "./MODAL/ModalnewEvento";

const EventosViews =()=>{
    const[show,setShow] = useState(false)
  const [espacio,setEspacio]=useState([])

 function nuevoevento(){
  setShow(true)

 }
   
   
    return(
        <div className="container-fluid">

              <ModalNewEvento
              show={show}
              Setshow={setShow}
              />
                

                        {/**Posible eliminar */}
                        <div className="d-none row justify-content-center align-items-center">
                            <div className="col-sm-7">
                                <div className="card" style={{backgroundColor: 'gray', color: 'white'}}>
                                    <div className="card-body text-center">
                                        <br/>
                                        <b>ESCENARIO</b>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>


                    <div className="row d-none">
                        <div className="col-sm-2">
                            <h2 className="pb-2 border-bottom">MESAS</h2>
                        </div>
                        <div className="col-sm-9" style={{textAlign: 'right'}}>
                            <span className="badge badge-danger">Pagados</span>
                            <span className="badge badge-warning">Reservados</span>
                            <span className="badge badge-success">Libres</span>
                            <span className="badge badge-secondary">Seleccionados</span>
                        </div>
                    </div>
                        {/**posible eliminar fin */}

                        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
                          </Row>











                <div className="row">

                
               
              
                    <div className="col-md-12">
                        

                        <button  className="btn btn-success" onClick={nuevoevento}><i className="mr-2 fa fa-plus"></i> Nuevo evento</button>

                        <br/><br/>

                        <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Eventos
                            </div>
                            <div className="card-body">

                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Descripcion</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Lugar</th>
                                            <th scope="col">Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Evento 1</th>
                                            <td>1</td>
                                            <td>Otto</td>
                                            <td><span className="badge me-1 bg-success text-white">Emitido</span></td>
                                            <td><a href="#">Descargar</a></td>
                                            <td>
                                            <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                                <a className="btn btn-primary btn-sm px-1"  data-toggle="tooltip" title="Ver mapa"><i className="fa fa-edit"></i></a>
                                            
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Evento 2</th>
                                            <td>2</td>
                                            <td>Thornton</td>
                                            <td><span className="badge me-1 bg-danger text-white">Usado</span></td>
                                            <td><a href="#">Descargar</a></td>
                                            <td>
                                            <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                                <a className="btn btn-primary btn-sm px-1"  data-toggle="tooltip" title="Ver mapa"><i className="fa fa-edit"></i></a>
                                             </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Evento 3</th>
                                            <td>3</td>
                                            <td>Thornton</td>
                                            <td><span className="badge me-1 bg-dark text-white">Anulado</span></td>
                                            <td><a href="#">Descargar</a></td>
                                            <td >
                                            <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                <a className="btn btn-primary btn-sm px-1" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                                <a className="btn btn-primary btn-sm px-1"  data-toggle="tooltip" title="Ver mapa"><i className="fa fa-edit"></i></a>
                                             </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )

}
export default EventosViews;