import React,{useEffect,useState} from "react";
import { Modal,Toast } from "react-bootstrap";
import { EditarSuscrito,CrearSuscritor } from "utils/Querypanel";
const ModalSuscritoView=(props)=>{
    const {show,datosperson,setshow,estado}=props
    const [validate,setValidate]= useState("")
    const [message, setmessage] = useState("");
    const [showtoas, setShowToas] = useState(false);
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
      
      if(datos.new_password.length<7 || !Object.values(parms).every((e)=>e)){
        setValidate("was-validated")  
        return true
      }else{
        console.log("paso")
        console.log(datos)
        try {
          const editados= await EditarSuscrito(datos.id,parms)
          const {success,message} =editados
          if(success){
          // alert("paso")
        //   await ListarUsuarios()// reloadpage()
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
          //  history.push("/admin/usuario")
          }                
        } catch (error) {
          setValidate("was-validated")
          setShowToas(true)
          setmessage("Hubo un error Verifique  que el correo no este duplicado")
         // console.log(error)          
        }
    }

    
    }
    useEffect(()=>{
      setValidate("") 
      
      if(estado=="update"){
        
        setDatos({
          ...datos,
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
            new_password:'',
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
                               <div className="invalid-feedback">
                                 Ingrese Nombre
                          </div>
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
                               <div className="invalid-feedback is-invalid">
                                 Ingrese una Dirección de correo
                          </div>

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
                              minLength={10}
                              required />
                               <div className="invalid-feedback">
                                 Ingrese un numero de contacto 
                          </div>

                </div>
                </div>
                <div className="col-md-6">
                <label className="form-label"><b>Dirección</b></label>
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
                              required 
                             />
                                <div className="invalid-feedback">
                                 Ingrese una Dirección
                          </div>

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
                              minLength={7}
                              required />

                          <div className="invalid-feedback">
                                  La contraseña debe ser mayor de 7 caracteres
                          </div>

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


        <Toast
        onClose={() => setShowToas(false)} show={showtoas} delay={4000} autohide
        className="top-center"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10000
        }}
      >
       <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">Hubo un error </strong>
      <small></small>
    </Toast.Header>
        <Toast.Body className="bg-danger text-white" >{message} </Toast.Body>
      </Toast>
        </>
    )





}
export default ModalSuscritoView