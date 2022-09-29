import React,{useEffect,useState} from "react";
import { Modal } from "react-bootstrap";

const ModalSuscritoView=(props)=>{
    const {show,datosperson,setshow}=props
    const [datos,setDatos]=useState({
        nombreCompleto:'',
        email:'',
        movil:'',
        ciudad:'',
        id:''
    })
    function handelchnge(e){
        setDatos({
            ...datos,
            [e.name]:e.value
        })
            
    }
    useEffect(()=>{
        setDatos({
            nombreCompleto:datosperson?datosperson.nombreCompleto:'',
            email:datosperson?datosperson.email:'',
            movil:datosperson?datosperson.movil:'',
            ciudad:datosperson?datosperson.ciudad:'',
            id:datosperson?datosperson.id:''

        })

    },[show])

    return(
        <>
        <Modal
        show={show}
        onHide={()=>setshow(false)}
        >
            <Modal.Header 
            closeButton>
                <h5>Datos de suscritor</h5>
            </Modal.Header>
            <Modal.Body>
            <div className="container">
                <form  >
                     <div className="row">
                     <div className="col-md-12">
                     <label className="form-label"><b>Nombres</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input id="nombreCompleto"
                              type="text"
                              value={datos.nombreCompleto}
                              onChange={(e)=>handelchnge(e.target)}
                              className="form-control"
                              name="nombreCompleto" 
                              required />
                </div>
                </div>
                     </div>
                
                <div className="row">
                <div className="col-md-12">
                <label className="form-label"><b>Correo</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                            </div>
                            <input id="email"
                            value={datos.email}
                              type="email"
                              onChange={(e)=>handelchnge(e.target)}
                              className="form-control"
                              name="email" 
                              required />

                </div>
                </div>
                </div>
                
                <div className="row">
                <div className="col-md-6">
                <label className="form-label"><b>Celuar</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-phone"></i></span>
                            </div>
                            <input id="movil"
                            value={datos.movil}
                            onChange={(e)=>handelchnge(e.target)}
                              type="text"
                              className="form-control"
                              name="movil" 
                              required />

                </div>
                </div>
                <div className="col-md-6">
                <label className="form-label"><b>Ciudad</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-map"></i></span>
                            </div>
                            <input id="ciudad"
                            value={datos.ciudad}
                            onChange={(e)=>handelchnge(e.target)}
                              type="text"
                              className="form-control"
                              name="ciudad" 
                              required />

                </div>
                </div>
                

                </div>
                
                
                
                </form>
                <div className="d-flex flex-wrap  justify-content-end ">
                                
                                {true?
                                <button  className="btn btn-success float-right" >Actualizar</button>:
                                <button  className="btn btn-success float-right">Crear</button>

                            
                            }
                 </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )





}
export default ModalSuscritoView