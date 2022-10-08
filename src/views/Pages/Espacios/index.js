import React, {useEffect,useState} from  "react";
import Modalregistroespacio from "./MODAL/Registrolocalidad.js";
import { EliminarEspacios,ListarEspacios } from "utils/Querypanel.js";
import { Row,Col,Card } from "react-bootstrap";
import NewEspacioView from "./MODAL/NuevoEspacio.js";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import RegistroViwstab from "./MODAL/Registrodos.js";

const EventosViews =()=>{
  const [localidaname,setLocalidad]=useState({id:'',nombre:'', descripcion:''})
  const [estado,SetEstado]=useState("")
  const [alert,setAlert] = React.useState(null)
  const [show,setShowToast] =useState(false)
  const [showNuevo,SetShownuev]=useState(false)
  const [listaEsp,setListaEspa]=useState([])
   
  function  AgregasSillasMesa(e){
   
    setLocalidad(e)
   
    
     setShowToast(true)
}
async function Lista (){
  const cargarLista = await ListarEspacios()
  const{success,data}= cargarLista
  console.log(data)
  if(success){
    setListaEspa(data) }
}
 async function Elimnar(e){
  try {
    const elimonado= await EliminarEspacios(e)
    console.log(elimonado)
    
  } catch (error) {
    console.log(error)
    
  }
 }
function Editar(e,estado){
    SetEstado(estado)
    setLocalidad({...e})
    SetShownuev(true)
   }
   
   
    useEffect(()=>{
      (async()=>{
        await Lista()

      })()
     
       
    },[])
    const successAlert = (e) => {
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Estas Seguro?"
          onConfirm={() => Elimnar(e)}
          onCancel={() => cancelDetele()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          showCancel
        >Esta seguro de eliminar este Espacio
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
          El usuario se elimino correctamenta
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
    
 
    return(
        <div className="container-fluid">
           {alert}   
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
                 
            
              
          
                <div>
                </div>
                <div className="col-md-12">
                <button  className="btn btn-success" onClick={()=> Editar({id:'',nombre:'', description:''},"")} ><i className="mr-2 fa fa-plus"></i> Nuevo espacio  </button>
               

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
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripcion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {listaEsp.length>0?
                                  listaEsp.map((e,i)=>{
                                    return(
                                      <tr>
                                         <th scope="row">{e.id}</th>
                                        <td>{e.nombre}</td>
                                        <td> {e.descripcion} </td>
                                        <th>
                                            
                                                <a   onClick={()=>AgregasSillasMesa(e)}className="btn btn-primary btn-sm"><i className="fa fa-eye"></i></a>    
                                          
                                                <a onClick={()=>successAlert(e.nombre)} className="btn btn-primary btn-sm"> <i className="fa fa-trash"></i></a>
                                                <a onClick={()=> Editar(e,"update")} className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></a>
                                            
                                        </th>

                                      </tr>
                                    )
                                  })                                 
                                
                                :''}
                                    
                                    
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
           {/* 
           <Modalregistroespacio
            show={show}
           datosEs={localidaname}
            setShowToast={setShowToast}            
            /> 
           
           Modal regitra y actualiza */}
            <RegistroViwstab
            show={show}           
             setShowToast={setShowToast}            
             /> 
            <NewEspacioView
            showNuevo={showNuevo}
            localidaname={localidaname}
            estado={estado}
            SetShownuev={SetShownuev}
            
            />     

            </div>

    )
}
export default EventosViews