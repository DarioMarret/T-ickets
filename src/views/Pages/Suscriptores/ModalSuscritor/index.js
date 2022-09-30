import React,{useEffect,useState} from "react";
import { Modal } from "react-bootstrap";
import { EditarSuscrito,CrearSuscritor } from "utils/Querypanel";
const ModalSuscritoView=(props)=>{
    const {show,datosperson,setshow,estado}=props
    const [validate,setValidate]= useState("")
    const [datos,setDatos]=useState({
        nombreCompleto:'',
        email:'',
        movil:'',
        ciudad:'',
        new_password:'',
        id:''
    })
    function handelchnge(e){
        setDatos({
            ...datos,
            [e.name]:e.value
        })            
    }
    async function Editasuscrito(){
      let parms={
        "nombreCompleto": datos.nombreCompleto,
        "email": datos.email,
        "new_password": datos.new_password,
        "movil": datos.movil,
        "ciudad": datos.ciudad
      }
      if(!Object.values(parms).every((e)=>e)){
        setValidate("was-validated")  
        return true
      }else{
        console.log("paso")
        console.log(datos)
        try {
          const editados= await EditarSuscrito(datos.id,parms)
          const {success,message} =editados
          if(success){
           //alert(message)
          // await ListarUsuarios() reloadpage()
           location.reload()
          // SetModalEdit(false)         
          }   
        } catch (error) {
          console.log(error)
          
        }
      }
    }
    async function Crearsuscrito(){    
        let params ={
        "nombreCompleto": datos.nombreCompleto,
        "email": datos.email,
        "password": datos.new_password,
        "movil": datos.movil,
        "ciudad": datos.ciudad
        }           
        if(!Object.values(params).every((d)=>d)){ 
          setValidate("was-validated")  
          return true }
        else {
        try {
          setValidate("")
       const useradd=await CrearSuscritor(params)
          const {success,message} =useradd
          console.log(useradd)
          if(success){

            location.reload()
          //  SetModalEdit(false)
            history.push("/admin/usuario")
          }                
        } catch (error) {
          console.log(error)          
        }
    }

    
    }
    useEffect(()=>{
      setValidate("") 
      
      if(estado=="update"){
        
        setDatos({
            nombreCompleto:datosperson?datosperson.nombreCompleto:'',
            email:datosperson?datosperson.email:'',
            movil:datosperson?datosperson.movil:'',
            ciudad:datosperson?datosperson.ciudad:'',
            id:datosperson?datosperson.id:''
        })}else{
          setDatos({
            nombreCompleto:'',
            email:'',
            movil:'',
            ciudad:'',
            id:''
        })
        }


    },[show])
    return(
        <>
        <Modal
        show={show}
        onHide={()=>setshow(false)}
        >
            <Modal.Header 
            closeButton>
                <h5>
                  {estado=="update"?" Datos de suscritor":"Crear suscritor"}
                 </h5>
            </Modal.Header>
            <Modal.Body>
            <div className="container">
                <form className={validate} >
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
                <div className="row">
                <div className="col-md-12">
                <label className="form-label"><b>Password</b></label>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input id="new_password"
                            value={datos.new_password}
                              type="password"
                              onChange={(e)=>handelchnge(e.target)}
                              className="form-control"
                              name="new_password" 
                              required />

                </div>
                </div>
                </div>
                
                
                
                </form>
                <div className="d-flex flex-wrap  justify-content-end ">
                                
                                {estado=="update"?
                                <button  className="btn btn-success float-right" onClick={Editasuscrito}>Actualizar</button>:
                                <button  className="btn btn-success float-right" onClick={Crearsuscrito}>Crear</button>

                            
                            }
                 </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )





}
export default ModalSuscritoView