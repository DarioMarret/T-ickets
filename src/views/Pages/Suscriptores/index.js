import React ,{useEffect,useState}from "react";
import { Card,Col,Row ,Modal } from "react-bootstrap";
import { GetSuscritores } from "utils/Querypanel";
import ModalSuscritoView from "./ModalSuscritor";

const SuscritorViews =()=>{
    const[show,setshow] = useState(false)
    const [suscritores,setsuscritor]=useState([])
    const[suscritor,setSuscri]=useState({})

    const selelccionasuscrito=(e)=>{
      setSuscri(e)
      setshow(true)
    }

 const nuevoevento = async ()=>{
  try {
    const  data  = await GetSuscritores()
   // console.log(data.users.length>0)
    if(data.users.length>0){
      setsuscritor(data.users)

    }
  } catch (error) {
    console.log(error)
  }
 }

 React.useEffect(() => {
  (async () => {
    await nuevoevento()
  })()
}, [])

    return(
        <div className="container-fluid">

            
          <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Total Suscritores</p>
                      <Card.Title as="h4">{suscritores.length}</Card.Title>
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
                        

                        <button  className="btn btn-success" onClick={nuevoevento}><i className="mr-2 fa fa-plus"></i> Nuevo Suscritores</button>

                        <br/><br/>

                        <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Suscritos
                            </div>
                            <div className="card-body">

                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            
                                            <th scope="col">Nombres</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Dirección</th>                                            
                                            <th scope="col">Teléfono</th>
                                            <th scope="Col">Fecha de Registro </th>
                                            <th scope="col">Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {suscritores.length>0?
                                        suscritores.map((e,i)=>{
                                          return(
                                            <tr key={e.id+""+i}>
                                            <td >{e.nombreCompleto}</td>
                                            <td>{e.email}</td>
                                            <td>{e.ciudad}</td>
                                            <td>{e.movil} </td>
                                            <td>{e.fechaCreacion} </td>
                                            <td>{e.enable==1?<span className="badge me-1 bg-dark text-white">Anulado</span>:<span className="badge me-1 bg-success text-white">Activo</span>}</td>
                                            <td >
                                            <a className="btn btn-primary btn-sm mx-1" data-toggle="tooltip" title="Ver suscritor" ><i className="fa fa-eye"></i></a>
                                            <a className="btn btn-primary btn-sm mx-1"  data-toggle="tooltip" title="editar suscritor" onClick={()=>selelccionasuscrito(e)}><i className="fa fa-edit"></i></a>
                                             </td>
                                       </tr>

                                          )
                                        }):
                                      ""}
                                        
                                       {/* <tr>
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
                                       </tr>*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalSuscritoView
                show={show}
                setshow={setshow}
                datosperson={suscritor}
                />
               
            </div>
    )

}
export default SuscritorViews;