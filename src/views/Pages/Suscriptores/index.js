import React ,{useEffect,useState}from "react";
import { Card,Col,Row ,Modal } from "react-bootstrap";
import { GetSuscritores,EliminarSuscrito } from "utils/Querypanel";
import ModalSuscritoView from "./ModalSuscritor";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import SweetAlert from 'react-bootstrap-sweetalert';

const SuscritorViews =()=>{
  let usehistory=useHistory()
    const[show,setshow] = useState(false)
    const [suscritores,setsuscritor]=useState([])
    const[suscritor,setSuscri]=useState({})
    
    const [estado,setEstado] =useState("")

    const [alert,setAlert] = React.useState(null)
    const newsuscrito=()=>{
      setEstado("")
    setshow(true)}
    const selelccionasuscrito=(e)=>{
      
      setEstado("update")
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
 const Eliminasucrito=async(id)=>{
  try {
    const elimna = await EliminarSuscrito(id)
    let lista =suscritores.filter(e=>e.id!=id) 
    const { success,message} =elimna
     if(success){
    setsuscritor(lista)         
    successDelete()
  }
    
  } catch (error) {
    console.log(error)
    
  }

 }
 const successAlert = (e) => {
  setAlert(
    <SweetAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Estas Seguro?"
      onConfirm={() => Eliminasucrito(e)}
      onCancel={() => cancelDetele()}
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      confirmBtnText="Confirmar"
      cancelBtnText="Cancelar"
      showCancel
    >
      Esta seguro de eliminar este Suscritor
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
 React.useEffect(() => {
  (async () => {
    await nuevoevento()
  })()
}, [])
 
    return(
        <div className="container-fluid">

      {alert}
            
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
                        

                        <button  className="btn btn-success" onClick={newsuscrito}><i className="mr-2 fa fa-plus"></i> Nuevo Suscritores</button>

                        <br/><br/>

                        <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Suscritos
                            </div>
                            <div className="card-body table-responsive">

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

                                            
                                      {/*<Button
                                          onClick={() => successAlert(e.id)}
                                          variant="danger"
                                          size="sm"
                                          className="text-danger btn-link like"
                                        >
                                          <i className="fa fa-trash" />
                                        </Button>*/}
                                        <Button
                                         onClick={()=>usehistory.push("/admin/suscritor/"+e.id+"")}
                                          variant="danger"
                                          size="sm"
                                          className="text-danger btn-link like"
                                        >
                                          <i className="fa fa-eye" />
                                        </Button>
                                        {/*<Button
                                          onClick={()=>selelccionasuscrito(e)}
                                          variant="info"
                                          size="sm"
                                          className="text-info btn-link like"
                                        >
                                          <i className="fa fa-edit" />
                                        </Button>*/}
                                       
                                      
                                          </td>
                                       </tr>

                                          )
                                        }):
                                        <tr></tr>  } 
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalSuscritoView
                show={show}
                setshow={setshow}
                estado={estado}
                datosperson={suscritor}
                />
               
            </div>
    )

}
export default SuscritorViews;