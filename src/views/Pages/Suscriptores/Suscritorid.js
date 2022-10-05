import React,{useState, useEffect} from "react";
import { Row,Col,Card ,Container,Button} from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import { CancelarSubscriptor ,GetSuscritores} from "utils/Querypanel";
import ModalSuscritoView from "./ModalSuscritor";
import moment from "moment";
import 'moment-timezone';
import SweetAlert from 'react-bootstrap-sweetalert';
import { EliminarSuscrito } from "utils/Querypanel";
const SuscritoridView=()=>{
    let {id} = useParams()   
    let history =useHistory()
    const[show,setshow] = useState(false)
    const [alert,setAlert] = React.useState(null)
    const [suscritores,setTikes]=useState([])
    const [suscritoid,setsuscritor]=useState({
        ciudad: "",
        email: "",
        enable: 0,
        fechaCreacion: "",
        id: 0,
        movil: "",
        nombreCompleto: ""
    })
    async function Eliminasucrito(){
        try {        
          if(suscritoid.email!=''){
          const cancelar = await CancelarSubscriptor(suscritoid.email)
          const {success}=cancelar
          console.log(cancelar)
          if(success){
          location.reload()
        }
        }
        } catch (error) {
            hideAlert()
         console.log(error)
        }
    
      }
      async function EliminarS(){
        try {
            const deleter = await EliminarSuscrito(id)
            const {success}=deleter
            console.log(success)
            if(success){
                history.push("/admin/suscritor")
            }
            
        } catch (error) {
            console.log(error)
            
        }
      }
   const successAlert = () => {
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
  const deleteAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => EliminarS()}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel>
        Esta seguro de Eliminar  al Suscritor 
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
 const nuevoevento = async ()=>{
    try {
      const  data  = await GetSuscritores()
     // console.log(data.users.length>0)
      if(data.users.length>0){
        const datos = data.users.filter((e)=>e.id==id)
        setsuscritor({...datos[0]})
       // console.log(datos[0])
       // setTikes(data.users)
  
      }
    } catch (error) {
      console.log(error)
    }
   }
   useEffect(()=>{
    (async()=>{
        await nuevoevento()
    })()

   },[]);
return(
    <>
    {alert}
      <div className="container-fluid">
      <div className="d-flex justify-content-end align-items-end pb-2" >
                <div>
                <Button className="btn btn-wd btn-outline mr-1"
                        type="button"
                      onClick={()=>setshow(true)}
                        variant="success">
                        <span className="btn-label">
                          <i className="fas fa-edit"></i>
                        </span>
                        Editar
            </Button>
            <Button className="btn-wd btn-outline mr-1"
                        onClick={deleteAlert}
                        type="button"
                        variant="danger">
                        <span className="btn-label">
                          <i className="fas fa-trash"></i>
                        </span>
                        Eliminar
            </Button>
            <Button className="btn-wd btn-outline mr-1"
                        onClick={successAlert}
                        type="button"
                        variant="danger">
                        <span className="btn-label">
                          <i className="fas fa-trash"></i>
                        </span>
                        Cancelar suscriptor
            </Button>
                </div>
                
            


            </div>
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
          
          <Col lg="6" sm="12">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                <Col xl="6"xs="12">
                    <div className="">
                    <Card.Title as="h4">Suscritor </Card.Title>
                      <p className="card-category"> 
                    {suscritoid?suscritoid.nombreCompleto:''}</p>
                      
                    </div>
                  </Col>
                  <Col xl="5" xs="6">  
                  <div className="icon-big text-center ">
                      <i className="nc-icon nc-headphones-2 text-warning"></i>
                    </div>                
                   {/* <Button                                         
                    variant="danger"                   
                    className="text-danger  like">
                    <i className="fa fa-trash" />
                     Eliminar suscriptor
                    </Button>
                  </Col>
                  <Col  xl="3" xs="6">
                  <Button
                   variant="danger"
                   onClick={successAlert}
                   className="text-danger  like">
                    <i className="fa fa-trash" />
                     Cancelar suscriptor
                    </Button> */}                  
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                <i className="far fa-clock mr-1"></i>
                  Fecha de registro {moment(suscritoid.fechaCreacion).format('DD MMMM YYYY hh:mm:ss')}
                </div>
              </Card.Footer>
             
            </Card>
          </Col>
         
        </Row>
            
        <div className="row">

                
               
              
<div className="col-md-12">
         
            <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                               Tickets
                            </div>
                            <div className="card-body table-responsive">

                            <table className="table table-hover text-center ">
                                    <thead>
                                        <tr>
                                        <th scope="col">Concierto</th>
                                            <th scope="col">Cantidad</th>
                                            
                                            <th scope="col">Localidad</th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        suscritores.length>0?
                                        suscritores.map((e,i)=>{
                                            return(
                                              <tr>
                                              <th scope="row">{e.concierto}</th>
                                              <td>{e.cantidad}</td>
                                              <td>{e.valor}</td>
                                             
                                              <td> {e.localidad} </td>
                                              <td><span className="badge me-1 bg-success text-white">{e.estado}</span></td>
                                              <td>
                                              <a className="btn btn-primary btn-sm mx-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                              <a className="btn btn-primary btn-sm mx-1"  data-toggle="tooltip" title="Enviar"><i className="fa fa-paper-plane"></i></a> 
                                       
                                              </td>
                                          </tr>
                                            )
                                        }): 
                                        <tr>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <td >No hay datos</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th> 
                                        <th scope="row"></th>
                                      </tr>
                                      }
                                       
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                        </div>
            
        </div>
        <ModalSuscritoView
                show={show}
                setshow={setshow}
                estado={"update"}
                datosperson={suscritoid}/>
    </>
)

}
export default SuscritoridView;